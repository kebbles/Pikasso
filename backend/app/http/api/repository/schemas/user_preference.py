from mongoengine import *


class UserPreferenceSchema(Schema):
    id = IntField(unique=True, required=True)
    full_name = StringField(max_length=100, required=True)
    user_preferences = DictField(required=True)
    meta = {'db_alias': 'user_pref_alias'}
