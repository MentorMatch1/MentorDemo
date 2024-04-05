from openai import OpenAI
import json


class MentorMatching:
    '''Class with all the methods of the Chatgpt api for matching people'''

    def __init__(self):
        self.client = OpenAI(
            api_key='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'
        )
        self.user_profiles = ""

    def match(self, prompt, json_data):
        ''' 
        args: prompt
        returns: string of chatgpt's response
        '''

        # Formats User's Names and Descriptions as Strings for better interpretation in Chatgpt
        self.user_profiles = ""
        index = 0
        for user in json_data["Users"]:
            index += 1
            self.user_profiles += f"User {index+1}:\n" \
                f"Name: {user['Name']}\n" \
                f"Description: {user['Description']}\n\n"

        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a system meant to match the descriptions of the individuals, Look from within the description of individuals given and return a dictionary with match as the key, and a list with first index being their name and second index being why you think they are a good match with detail, you are only allowed to match 1 person the list cannot contain 2 people"},
                {"role": "user", "content": prompt+'\n'+str(self.user_profiles)}])

        dict_from_string = json.loads(completion.choices[0].message.content)
        assert type(dict_from_string) == dict

        return dict_from_string


if __name__ == '__main__':
    a = MentorMatching()
    response = a.match('Hello how are you doing')
    print(response)
