import json
import boto3
from collections import OrderedDict
from operator import itemgetter
from ..repository.global_rep import GlobalRepository
from ..repository.user_rep import UserRepository
from .preference_quantifier import PreferenceQuantifier


class DBManager:

    THRESHOLD = 0.10

    def __init__(self, global_repo_client=GlobalRepository(), user_repo_client=UserRepository(),
                 pref_quantifier=PreferenceQuantifier()):
        self.global_repo_client = global_repo_client
        self.user_repo_client = user_repo_client
        self.pref_quantifier = pref_quantifier
    
    def calculate_uniqueness(self, user_freq):
        total_sum = 0
        for (key, value) in user_freq.items():
            total_sum += value
        user_uniqueness_freq = {key: 1-(value/total_sum) for (key, value) in user_freq.items()}
        return {key: (1 if value == 0 else value) for (key, value) in user_uniqueness_freq.items()}
    
    def is_within_threshold(self, target, value):
        return (target - DBManager.THRESHOLD >= value) or (target + DBManager.THRESHOLD <= value)
    
    def map_closeness(self, self_value, other_value):
        avg_value = (self_value+other_value)/2.0
        if avg_value <= 1 and avg_value > 0.7:
            return 5
        if avg_value <= 0.7 and avg_value > 0.4:
            return 4
        if avg_value <= 0.4 and avg_value > 0.3:
            return 3
        if avg_value <= 0.3 and avg_value > 0.2:
            return 2
        if avg_value <= 0.2 and avg_value > 0.1:
            return 1
        return 0

    def find_unique_preferences(self, images, user_id):
        # self.global_repo_client.delete({})
        # self.user_repo_client.delete({})
        preference_results = {}
        for image in images:
            for label, freq in self.pref_quantifier.find_unique_preferences(image, user_id).items():
                if label in preference_results:
                    preference_results[label] += freq
                else:
                    preference_results[label] = freq
        # UserPreferenceSchema(user_id=456, full_name="Eric", user_preferences={
        #     "Electronics": 0.0, "Computer": 0.0, "Monitor": 0.0, "Screen": 0.0
        # }).save()
        self.user_repo_client.create({"user_id": 456, "full_name": "Eric",
                                      "user_preferences": {
                                          "Electronics": 0.0, "Computer": 0.0, "Screen": 0.0
                                      }})
        self.user_repo_client.create({"user_id": 123, "full_name": "John",
                                      "user_preferences": {
                                          "Electronics": 0.0, "Screen": 0.0
                                      }})
        self.user_repo_client.create({"user_id": 567, "full_name": "Bob",
                                      "user_preferences": {
                                          "Computer": 0.0, "Screen": 0.0
                                      }})
        self.global_repo_client.create({"object_name": "Electronics", "object_freq": 5})
        self.global_repo_client.create({"object_name": "Screen", "object_freq": 2})
        global_user_freq = {}
        for (key, value) in preference_results.items():
            # table_item = GlobalFrequencySchema.objects(object_name=key)
            table_item = self.global_repo_client.find({"object_name": key})
            if table_item:
                global_user_freq[key] = table_item["object_freq"] + value
                self.global_repo_client.update({"object_name": key}, {"$set": {"object_freq": global_user_freq[key]}})
            else:
                self.global_repo_client.create({"object_name": key, "object_freq": value})
                global_user_freq[key] = value
        user_uniqueness_freq = self.calculate_uniqueness(global_user_freq)
        if not self.user_repo_client.find({"user_id": user_id}):
            self.user_repo_client.create({"user_id": user_id, "full_name": "##TEMP##",
                                          "user_preferences": user_uniqueness_freq})
        for user in self.user_repo_client.find_all({}):
            other_user_freq = {}
            for (key, value) in user["user_preferences"].items():
                # table_item = GlobalFrequencySchema.objects(object_name=key)
                table_item = self.global_repo_client.find({"object_name": key})
                if table_item:
                    other_user_freq[key] = table_item["object_freq"]
            self.user_repo_client.update({"user_id": user_id},
                                         {"$set": {"user_preferences": self.calculate_uniqueness(other_user_freq)}})
            # UserPreferenceSchema.objects(user_id=user.user_id)\
            #     .update(set__user_preferences=self.calculate_uniqueness(other_user_freq))
        matches = {}
        ranking_pool = OrderedDict()
        for user in self.user_repo_client.find_all({"user_id": {"$ne": user_id}}):
            closeness_sum = 0
            closeness_count = 0
            object_associations = {}
            for (key, value) in user_uniqueness_freq.items():
                self_preference = user_uniqueness_freq[key]
                other_preference = user["user_preferences"].get(key, None)
                if other_preference is not None and self.is_within_threshold(self_preference, other_preference):
                    closeness_mapping = self.map_closeness(self_preference, other_preference)
                    if closeness_mapping != 0:
                        closeness_sum += self_preference + other_preference
                        closeness_count += 2
                        object_associations[key] = closeness_mapping
            if closeness_count != 0:
                matches[user["user_id"]] = {"full_name": user["full_name"], "object_associations": object_associations,
                                        "closeness_ranking": None}
                ranking_pool[user["user_id"]] = closeness_sum/closeness_count
        ranking_pool = sorted(ranking_pool.items(), key=itemgetter(1))
        enumerated_ranking_pool = {}
        for i, (key, value) in zip(range(len(ranking_pool)), dict(ranking_pool).items()):
            enumerated_ranking_pool[key] = i + 1
        for (key, value) in enumerated_ranking_pool.items():
            matches[key]["closeness_ranking"] = value
        output = {}
        output["matches"] = matches
        output["self"] = self.user_repo_client.find({"user_id": user_id})["user_preferences"]
        self.global_repo_client.delete({})
        self.user_repo_client.delete({})
        print(output)
        return output
