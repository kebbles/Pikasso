import json
from flask import Flask, json, g, request
from api.services.db_manager import DBManager
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/image_learn", methods=["POST"])
def image_learn():
    request_images = [image for (key, image) in request.files.items()]
    association_results = DBManager().find_unique_preferences(request_images, request.form.get("id"))
    return json_response(association_results)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
