import os
from mongoengine import connect
from pymongo import MongoClient


class UserRepository(object):

    COLLECTION_NAME = "user_preferences"

    def __init__(self):
        self.db = MongoClient("mongodb+srv://EricLiang:198726543@cluster0-cb1lw.mongodb.net/test?retryWrites=true&w=majority").user_preferences
        print("Created User Repository")

    def find_all(self, selector):
        return self.db.user_preferences.find(selector)
 
    def find(self, selector):
        return self.db.user_preferences.find_one(selector)
    
    def create(self, freq_entry):
        return self.db.user_preferences.insert_one(freq_entry)

    def update(self, selector, user_entry):
        return self.db.user_preferences.update_one(selector, user_entry).modified_count
    
    def delete(self, selector):
        return self.db.user_preferences.delete_many(selector).deleted_count
