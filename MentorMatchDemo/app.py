from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from api_backend import MentorMatching
import re

app = Flask(__name__)
CORS(app)


def is_valid_email(email):
    '''
    inputs: the current users email for create a profile
    returns: True or False based on the regular expression done on the email
    '''
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def read_json():
    with open('data.json', 'r') as file:
        data = json.load(file)
    return data


def write_json(data):
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)


@app.route('/Users', methods=['POST'])
def create_account():

    new_data = request.json
    valid_email = is_valid_email(new_data['Email'])
    if not (valid_email):
        return jsonify({'message': 'Invalid Email Entered'}), 400

    database = read_json()
    user_prompt = new_data['Description']

    # OpenAi Chatgpt
    chatgpt_match = MentorMatching()
    match_response = chatgpt_match.match(user_prompt, database)

    new_data['response'] = match_response
    database['Users'].append(new_data)
    write_json(database)

    return jsonify(match_response), 200


@app.route('/Login', methods=['POST'])
def login():
    data = request.json
    database = read_json()

    for users in database['Users']:
        # Change user_id and Name
        if data['Name'] == users['Name'] and data['Email'] == users['Email']:
            return jsonify({"logged_user": users}), 200

    return jsonify({'message': 'Login Unsuccessful, Please Enter Credentials Correctly'}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8080)
