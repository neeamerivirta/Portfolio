import random
import json

def generate_id():
    """
    Generates a unique random id.
    Returns:
    str: A unique random integer id as a string.
    """
    with open('backend/scores.json', 'r+') as file:
        scores = json.load(file)

    unique_id = None
    while not unique_id: #while loop that continues until a unique ID is generated
        new_id = random.randint(1,1000)
        ids = [score['id'] for score in scores] # extract existing 'id' values from scores
        if new_id not in ids:
            unique_id = new_id
    return str(unique_id)

# saves the provided score and full name to the 'scores.json' file in backend in ascending order
def save_to_json(data):
    """
    Saves the provided score and full name to the 'scores.json' file in backend in ascending order.
    
    Args:
    data (dict): A dictionary containing score and full name data to be saved.
    Returns:
    None
    """
    with open('backend/scores.json', 'r+') as file:
        json_data = json.load(file) #loading existing data
        json_data.append(data) #append new data to list
        file.seek(0)
        json.dump(json_data, file, indent=4) # write the updated data to file
        file.truncate()

# reads the content of the scores.json file and returns it as a list of dictionaries
def all_scores():
    """
    Reads the content of the scores.json file and returns it as a list of dictionaries sorted by score in ascending order.
    Returns:
    List[Dict]: A list of dictionaries containing score and full name data sorted by score in ascending order.
    """
    file_path_json = 'backend/scores.json'
    with open(file_path_json, 'r') as file:
        scores = json.load(file)
    # sort the scores by score in ascending order
    sorted_scores = sorted(scores, key=lambda k: float(k["score"]))
    return sorted_scores

# This function loads scores from a JSON file, sorts them in descending order by score,
# and returns the top 10 scores.
def top_10_scores():
    file_path_json = 'backend/scores.json'
    with open(file_path_json, 'r') as file:
        scores = json.load(file)
    # sort the scores by score in descending order
    sorted_scores = sorted(scores, key=lambda k: float(k["score"]), reverse=True)
    # return the top 10 scores
    return sorted_scores[:10]

# updates the changes to scores.json file
def update_scoreboard(scores):
    """
    Updates the changes to scores.json file.
    Args:
    scores (List[Dict]): A list of dictionaries containing score and full name data to be saved.
    Returns:
    None
    """
    with open('backend/scores.json', 'r+') as file:
        json_data = scores
        file.seek(0)
        json.dump(json_data, file, indent=4) # write the updated data to file
        file.truncate()
