from functools import reduce
import json
import boto3
from ..repository.global_rep import GlobalRepository


class PreferenceQuantifier(object):

    def __init__(self):
        pass
    
    def get_rekognition_result(self, image):
        client = boto3.client('rekognition')
        return client.detect_labels(Image={'Bytes': image.read()})

    def find_unique_preferences(self, image, user_id):
        result = self.get_rekognition_result(image)
        label_count = {}
        for label in result.get("Labels"):
            if label.get("Name") in label_count:
                label_count[label.get("Name")] += 1
            else:
                label_count[label.get("Name")] = 1
            for parent in label.get("Parents"):
                if parent.get("Name") in label_count:
                    label_count[parent.get("Name")] += 1
                else:
                    label_count[parent.get("Name")] = 1
        print(label_count)
        return label_count
    
    # def find_scale_preferences(self, image, user_id):
    #     result = self.get_rekognition_result(image)
    #     label_count_data = {}
    #     for label in result.get("Labels"):
