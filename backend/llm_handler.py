from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

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
    # Tokenize input text
    input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors="pt")

    # Generate response
    response_ids = model.generate(input_ids, max_length=max_length, pad_token_id=tokenizer.eos_token_id)

    # Decode response
    response_text = tokenizer.decode(response_ids[:, input_ids.shape[-1]:][0], skip_special_tokens=True)

    return response_text

# Define route for handling LLM requests
@app.route('/generate', methods=['POST'])
def handle_generate():
    data = request.json
    input_text = data.get('input_text', '')
    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400

    response_text = generate_response(input_text)
    return jsonify({'response': response_text})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
