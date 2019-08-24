from mongoengine import *


class GlobalFrequencySchema(Document):
    object_name = StringField(required=True, max_length=100)
    object_freq = IntField(required=True)
    meta = {'db_alias': 'global_freq_alias'}
