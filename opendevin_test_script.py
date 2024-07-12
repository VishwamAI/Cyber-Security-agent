import requests

# Define the OpenDevin API URL
opendevin_api_url = "http://localhost:3000"

# Function to send a test request to the OpenDevin API
def send_test_request():
    try:
        response = requests.get(opendevin_api_url)
        response.raise_for_status()
        print("Connection to OpenDevin API successful!")

        # Check the content type of the response
        if response.headers.get('Content-Type') == 'application/json':
            print("Response:", response.json())
        else:
            print("Response:", response.text)
    except requests.exceptions.RequestException as e:
        print("Error connecting to OpenDevin API:", e)

# Main function to execute the test
if __name__ == "__main__":
    send_test_request()
