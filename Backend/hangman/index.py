from flask import Flask, jsonify, request, render_template, make_response
from scoreboard_helper import *
import json
import bcrypt

app = Flask(__name__)

PASSWORD = "kukkakaali"
    
@app.route("/")
def root():
    return "<h1>Here are the Hangman high scores</h1>"

# displays high scores in HTML using a template
@app.route('/highscores' , methods = ['GET', 'POST'])
def display_data():
    # pass the content to the template to display on the web page
    scores_list = [(int(d['id']), float(d['score']), (d['name'])) for d in all_scores()]    
    return render_template('highscores.html', scores = scores_list)

# displays high scores in HTML using a template
@app.route('/highscores/desc10' , methods = ['GET', 'POST'])
def display_desc_data():
    # pass the content to the template to display on the web page
    scores_list = [(int(d['id']), float(d['score']), (d['name'])) for d in top_10_scores()]    
    return render_template('highscores.html', scores = scores_list)

# displays high scores in JSON format for the cli
@app.route('/highscores/json' , methods = ['GET'])
def display_json_data():
    content = top_10_scores()
    return content

# displays a single high score by ID, calls all_scores function and searches for the score with the given ID
@app.route("/highscores/<string:the_id>")
def get_score(the_id):
    customers = all_scores()
    print(customers)
    for i in range (len(customers)):
        if (customers[i]["id"] == the_id):
            return jsonify(customers[i])
    return make_response("",404)

# deletes a high score by ID, calls all_scores function and searches for the score with the given ID
@app.route('/highscores/<string:the_id>', methods=['DELETE'])
def delete_score(the_id):
    customers = all_scores()
    index_to_be_deleted = -1
    for i in range (len(customers)):
        if (customers[i]["id"] == the_id):
            index_to_be_deleted = i

    if (index_to_be_deleted != -1):
        print(customers)
        customers.pop(index_to_be_deleted)
        print(customers)
        update_scoreboard(customers)
        return make_response("", 204)
    else:
        return make_response("",404)

# handles the POST method and adds a new score to the scores.json file
@app.route('/', methods=['POST'])
def add_score():
    unique = False
    while not unique:
        id = generate_id()
        unique = True
        for score in all_scores():
            if score["id"] == id:
                unique = False
                break
    # encoding the password
    bytes = PASSWORD.encode('utf-8') # converting password to array of bytes

    hashed = request.form['password']
    hashbytes = hashed.encode('utf-8')
    if bcrypt.checkpw(bytes, hashbytes):        
        new_data = {
            "id": id,
            "score": request.form['score'],
            "name":request.form['name']
        }
        save_to_json(new_data)
        return make_response("", 201)
    else:
        return make_response("", 403)
        print("Incorrect password")

if __name__ == "__main__":
    app.run(debug=True)
    