from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load pre-trained model and tokenizer
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Function to generate a response
def generate_response(input_text):
    # Tokenize input text
    input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors="pt")

    # Generate response
    response_ids = model.generate(input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    # Decode response
    response_text = tokenizer.decode(response_ids[:, input_ids.shape[-1]:][0], skip_special_tokens=True)

    return response_text

# Interactive chat loop
if __name__ == "__main__":
    print("Chat with the model (type 'exit' to stop):")
    while True:
        user_input = input("User: ")
        if user_input.lower() == "exit":
            break
        response = generate_response(user_input)
        print(f"Model: {response}")
