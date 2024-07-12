from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load pre-trained model and tokenizer
def load_model(model_name="microsoft/DialoGPT-medium"):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    return tokenizer, model

# Initialize model and tokenizer
model_name = os.getenv("MODEL_NAME", "microsoft/DialoGPT-medium")
tokenizer, model = load_model(model_name)

# Function to generate a response
def generate_response(input_text, max_length=1000):
    try:
        # Tokenize input text
        input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors="pt")
        logger.info(f"Input IDs: {input_ids}")

        # Generate response
        response_ids = model.generate(input_ids, max_length=max_length, pad_token_id=tokenizer.eos_token_id)
        logger.info(f"Response IDs: {response_ids}")

        # Decode response
        response_text = tokenizer.decode(response_ids[:, input_ids.shape[-1]:][0], skip_special_tokens=True)
        logger.info(f"Response Text: {response_text}")

        return response_text
    except Exception as e:
        logger.error(f"Error generating response: {e}")
        return "An error occurred while generating the response."

# Define route for handling LLM requests
@app.route('/generate', methods=['POST'])
def handle_generate():
    try:
        data = request.json
        logger.info(f"Received data: {data}")
        input_text = data.get('input_text', '')
        if not input_text:
            logger.warning("No input text provided")
            return jsonify({'error': 'No input text provided'}), 400

        response_text = generate_response(input_text)
        logger.info(f"Generated response: {response_text}")
        return jsonify({'response': response_text})
    except Exception as e:
        logger.error(f"Error handling generate request: {e}")
        return jsonify({'error': 'An error occurred while processing the request'}), 500

# Advanced logic: Fetch issues from GitHub and generate responses based on issue titles
@app.route('/generate_from_issues', methods=['POST'])
def handle_generate_from_issues():
    try:
        from github_integration import fetch_issues
        repo_name = request.json.get('repo_name', '')
        logger.info(f"Received repository name: {repo_name}")
        if not repo_name:
            logger.warning("No repository name provided")
            return jsonify({'error': 'No repository name provided'}), 400

        issues = fetch_issues(repo_name)
        responses = []
        for issue in issues:
            response_text = generate_response(issue.title)
            responses.append({'issue_number': issue.number, 'issue_title': issue.title, 'response': response_text})

        logger.info(f"Generated responses for issues: {responses}")
        return jsonify({'responses': responses})
    except Exception as e:
        logger.error(f"Error handling generate_from_issues request: {e}")
        return jsonify({'error': 'An error occurred while processing the request'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
