import os
import re

# OpenDevin Configuration

# Define the OpenDevin API URL
OPENDEVIN_API_URL: str = "http://localhost:3000"

# Validate the OpenDevin API URL
if not re.match(r'^https?://', OPENDEVIN_API_URL):
    raise ValueError("Invalid OpenDevin API URL. Please provide a valid URL starting with http:// or https://")

# Define API authentication token (if required)
OPENDEVIN_API_TOKEN: str = os.getenv("OPENDEVIN_API_TOKEN")
if OPENDEVIN_API_TOKEN is None:
    raise ValueError("OpenDevin API token not found. Please set the OPENDEVIN_API_TOKEN environment variable.")

# Define GitHub token for authentication
GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN")
if GITHUB_TOKEN is None:
    raise ValueError("GitHub token not found. Please set the GITHUB_TOKEN environment variable.")

# Define Hugging Face API token for authentication
HUGGINGFACE_API_TOKEN: str = os.getenv("HUGGINGFACE_API_TOKEN")
if HUGGINGFACE_API_TOKEN is None:
    raise ValueError("Hugging Face API token not found. Please set the HUGGINGFACE_API_TOKEN environment variable.")

# Define request timeout settings
REQUEST_TIMEOUT: int = 10  # Timeout in seconds

# Define debug mode
DEBUG_MODE: bool = os.getenv("DEBUG_MODE", "False").lower() in ("true", "1", "t")

# Define other necessary configurations and parameters for OpenDevin integration
# Add any additional configurations as needed
