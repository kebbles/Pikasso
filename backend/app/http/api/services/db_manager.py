from functools import reduce
import json
import boto3
from ..repository.global_rep import GlobalRepository
from ..repository.user_rep import UserRepository
from ..repository.schemas.global_freq import GlobalFrequencySchema
from ..repository.schemas.user_preference import UserPreferenceSchema
from .preference_quantifier import PreferenceQuantifier


class DBManager(object):

    def __init__(self, global_repo_client=GlobalRepository(), user_repo_client=UserRepository(),
                 pref_quantifier=PreferenceQuantifier()):
        self.global_repo_client = global_repo_client
        self.user_repo_client = user_repo_client
        self.pref_quantifier = pref_quantifier
    
    def calculate_uniqueness(self, user_freq):
        total_sum = 0
        for (key, value) in user_freq.items():
            total_sum += value
        user_uniqueness_freq = {key: 1-value/total_sum for (key, value) in user_freq.items()}
        return {key: (1 if value == 0 else value) for (key, value) in user_uniqueness_freq.items()}

    def find_unique_preferences(self, image, user_id):
        preference_results = self.pref_quantifier.find_unique_preferences(image, user_id)
        UserPreferenceSchema(user_id=123, full_name="Eric", user_preferences={"Electronics": 0.8}).save()
        GlobalFrequencySchema(object_name="Electronics", object_freq=5).save()
        global_user_freq = {}
        for (key, value) in preference_results.items():
            table_item = GlobalFrequencySchema.objects(object_name=key)
            if table_item:
                global_user_freq[key] = table_item.first().object_freq + value
                GlobalFrequencySchema.objects(object_name=key).update(inc__object_freq=value)
            else:
                GlobalFrequencySchema(object_name=key, object_freq=value).save()
                global_user_freq[key] = value
        # for freq in GlobalFrequencySchema.objects:
        #     print(freq.object_name, freq.object_freq)
        user_uniqueness_freq = self.calculate_uniqueness(global_user_freq)
        print(user_uniqueness_freq)
        for user in UserPreferenceSchema.objects:
            other_user_freq = {}
            for (key, value) in user.user_preferences.items():
                table_item = GlobalFrequencySchema.objects(object_name=key)
                if table_item:
                    other_user_freq[key] = table_item.first().object_freq
            UserPreferenceSchema.objects(user_id=user.user_id)\
                .update(set__user_preferences=self.calculate_uniqueness(other_user_freq))
        
        UserPreferenceSchema.objects.delete()
        GlobalFrequencySchema.objects.delete()
