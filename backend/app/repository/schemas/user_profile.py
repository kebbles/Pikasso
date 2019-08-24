from marshmallow import Schema, fields


class UserProfileSchema(Schema):
    id = fields.Int(required=True)
    full_name = fields.Str()
    description = fields.Str()
    object_frequencies = fields.Dict()


class GlobalSchema(Schema):
    global_object_frequencies = fields.Dict()
    global_users = fields.
