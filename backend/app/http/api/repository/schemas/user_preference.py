from mongoengine import *


class UserPreferenceSchema(Document):
    user_id = IntField(required=True)
    full_name = StringField(max_length=100, required=True)
    user_preferences = DictField()
    meta = {'db_alias': 'user_pref_alias'}
