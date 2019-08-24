from functools import reduce
import json
import boto3
from ..repository.global_rep import GlobalRepository
from ..repository.user_rep import UserRepository
from ..repository.schemas.global_freq import GlobalFrequencySchema
from .preference_quantifier import PreferenceQuantifier


class DBManager(object):

    def __init__(self, global_repo_client=GlobalRepository(), user_repo_client=UserRepository(),
                 pref_quantifier=PreferenceQuantifier()):
        self.global_repo_client = global_repo_client
        self.user_repo_client = user_repo_client
        self.pref_quantifier = pref_quantifier
    
    def calculate_uniqueness(self, global_user_freq):
        total_sum = 0
        for (key, value) in global_user_freq.items():
            total_sum += value
        return {key: 1-value/total_sum for (key, value) in global_user_freq.items()}

    def find_unique_preferences(self, image, user_id):
        preference_results = self.pref_quantifier.find_unique_preferences(image, user_id)
        global_user_freq = {}
        GlobalFrequencySchema(object_name="Electronics", object_freq=5).save()
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

        GlobalFrequencySchema.objects.delete()
