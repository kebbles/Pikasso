import os
from mongoengine import connect
from pymongo import MongoClient


class GlobalRepository(object):

    COLLECTION_NAME = "global_frequencies"

    def __init__(self):
        mongo_url = os.environ.get('MONGO_URL')
        connection = MongoClient(mongo_url).database
        self.db = connection.global_frequencies
        connect(alias="global_freq_alias", db=GlobalRepository.COLLECTION_NAME)
        print("Created Global Repository")
