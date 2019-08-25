import os
from pymongo import MongoClient


class GlobalRepository(object):

    COLLECTION_NAME = "global_frequencies"

    def __init__(self):
        self.db = MongoClient("mongodb+srv://EricLiang:198726543@cluster0-cb1lw.mongodb.net/test?retryWrites=true&w=majority").global_frequencies
        print("Created Global Repository")
    
    def find_all(self, selector):
        return self.db.global_frequencies.find(selector)
 
    def find(self, selector):
        return self.db.global_frequencies.find_one(selector)
    
    def create(self, freq_entry):
        return self.db.global_frequencies.insert_one(freq_entry)

    def update(self, selector, freq_entry):
        return self.db.global_frequencies.update_one(selector, freq_entry).modified_count
    
    def delete(self, selector):
        return self.db.global_frequencies.delete_many(selector).deleted_count
