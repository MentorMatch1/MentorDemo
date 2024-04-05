# Function testing here
import re


def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


# Example usage:
emails = ['user@example.com', 'user@gmail.com',
          'user@ymail.com', 'user@hotmail.com', 'user@some-domain.co']

for email in emails:
    print(f"{email}: {'Valid Email' if is_valid_email(email) else 'Invalid Email'}")
