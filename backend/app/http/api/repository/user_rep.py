import os
from mongoengine import connect
from pymongo import MongoClient


class UserRepository(object):

    COLLECTION_NAME = "user_preferences"

    def __init__(self):
        mongo_url = os.environ.get('MONGO_URL')
        connection = MongoClient(mongo_url).database
        self.db = connection.user_preferences
        connect(alias="user_pref_alias", db=UserRepository.COLLECTION_NAME)
        print("Created User Repository")
