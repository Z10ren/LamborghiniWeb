import os
import subprocess
from datetime import datetime, timedelta

# Define the date range (Oct 1 to Oct 10, 2026)
start_date = datetime(2026, 10, 1, 10, 0, 0)
end_date = datetime(2026, 10, 10, 18, 0, 0)

current_date = start_date
day_counter = 1

while current_date <= end_date:
    date_str = current_date.strftime("%Y-%m-%dT%H:%M:%S")
    
    # Automatically find ALL files in the repository recursively (ignoring .git folder)
    for root, dirs, files in os.walk("."):
        if ".git" in root:
            continue
        for file in files:
            # Skip the script itself so it doesn't get cluttered
            if file == "generate_history_all.py" or file == "automate.sh":
                continue
            
            file_path = os.path.join(root, file)
            try:
                # Append a timestamp update to every single file found
                with open(file_path, "a", encoding="utf-8") as f:
                    f.write(f"\n# Automated touch for Day {day_counter}: {date_str}\n")
            except Exception as e:
                # Skip binary files or files that can't be opened as text
                pass

    # Stage all file changes across the entire repo
    subprocess.run(["git", "add", "."], check=True)

    # Set environment variables for backdating while keeping YOUR git profile as author
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str

    # Commit with the requested message
    msg = "Updated"
    subprocess.run(["git", "commit", "-m", msg], env=env, check=True)

    print(f"Generated global commit for: {date_str}")

    # Move to the next day
    current_date += timedelta(days=1)
    day_counter += 1

# Push everything to GitHub
print("Pushing complete repository history to GitHub...")
subprocess.run(["git", "push", "origin", "main", "--force"], check=True)
print("Full repository flaw operation successfully deployed!")
