from github import Github
import os

# Retrieve GitHub token from environment variable
github_token = os.getenv("GITHUB_TOKEN")
if github_token is None:
    raise ValueError("GitHub token not found. Please set the GITHUB_TOKEN environment variable.")

# Authenticate to GitHub
g = Github(github_token)

# Function to fetch issues from a repository
def fetch_issues(repo_name):
    repo = g.get_repo(repo_name)
    issues = repo.get_issues(state='open')
    return issues

# Function to create an issue in a repository
def create_issue(repo_name, title, body):
    repo = g.get_repo(repo_name)
    issue = repo.create_issue(title=title, body=body)
    return issue

# Function to create a pull request
def create_pull_request(repo_name, title, body, head, base):
    repo = g.get_repo(repo_name)
    pr = repo.create_pull(title=title, body=body, head=head, base=base)
    return pr

# Example usage
if __name__ == "__main__":
    repo_name = "VishwamAI/swe-agent"

    # Fetch issues
    issues = fetch_issues(repo_name)
    for issue in issues:
        print(f"Issue #{issue.number}: {issue.title}")

    # Create an issue
    new_issue = create_issue(repo_name, "Test Issue", "This is a test issue created by the swe-agent.")
    print(f"Created issue #{new_issue.number}: {new_issue.title}")

    # Create a pull request
    new_pr = create_pull_request(repo_name, "Test PR", "This is a test pull request created by the swe-agent.", "devin/delete-all-files/31674", "main")
    print(f"Created pull request #{new_pr.number}: {new_pr.title}")
