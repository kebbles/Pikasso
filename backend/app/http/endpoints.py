from flask import Flask, json, g, request
# from app.kudo.service import Service as Kudo
from app.services.object_identifier import ObjectIdentifier as OI
from app.repository.schemas.user_profile import UserProfileSchema
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    # return json_response(Kudo(g.user).find_all_kudos())
    return json_response()


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
