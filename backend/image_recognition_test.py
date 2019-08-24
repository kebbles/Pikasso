import boto3

if __name__ == "__main__":
    imageFile = 'input.jpg'
    client = boto3.client('rekognition')
    with open(imageFile, 'rb') as image:
        response = client.detect_labels(Image={'Bytes': image.read()})
    print('Detected labels for ' + imageFile)
    print()
    for label in response['Labels']:
        print("Label: " + label['Name'])
        print("Confidence: " + str(label['Confidence']))
        print("Instances:")
        for instance in label['Instances']:
            print("  Bounding box")
            print("    Top: " + str(instance['BoundingBox']['Top']))
            print("    Left: " + str(instance['BoundingBox']['Left']))
            print("    Width: " + str(instance['BoundingBox']['Width']))
            print("    Height: " + str(instance['BoundingBox']['Height']))
            print("  Confidence: " + str(instance['Confidence']))
            print()
        print("Parents:")
        for parent in label['Parents']:
            print("   " + parent['Name'])
        print("----------")
        print()
    print('Done...')
