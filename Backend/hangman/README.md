# Python hangman and cloud highscore project

The aim of this project is to create an simple game that uses high score which is available in cloud. The project consists of two sub projects: a frontend ASCII hangman game and a backend for managing high scores in the cloud.

Frontend:
The hangman game is played on CLI and uses ASCII graphics. The player is given random words to guess from a local text file and after three right quesses te player wins. The players score is the time it took for them to play all three games. After winning, the player is asked their name and then a randomly generated id, their score and name is sent to the backend with a POST request for the high score JSON file.

Backend:
The backend is responsible for managing the high scores of the hangman game. It stores the highscores in a JSON file format that are show in render cloud application. The backend provides several API endpoints for handling different operations related to high scores and needs a password for usage.

# Authors

- Riina Koivisto
- Neea Merivirta

# Screenshots

![hangmanUI](https://user-images.githubusercontent.com/113358551/236265949-8a6af811-0a0f-49de-b560-55e9327861f3.png)

![hangmanHighscores](https://user-images.githubusercontent.com/113358551/236265944-bd79af91-f587-49e7-99a5-7de2a1e0c837.png)

![hangmanGame](https://user-images.githubusercontent.com/113358551/236265941-a9864378-725a-4c2a-ae7b-9c013fd5a847.png)

![hangmanAddscore](https://user-images.githubusercontent.com/113358551/236265938-2e3dc196-e4c1-493c-bd7c-bb8cb2ac7c36.png)

# Tech/framework used

The project is written with Python and uses two external modules that have to be installed for it to work:

- Flask: a web framework for Python
- bycrypt: a library for hashing passwords

# Installation and running

Provide step by step series of examples and explanations about how to get a development env running. Example:

```
# clone repo
git clone reop
cd repo

# start backend
python index.py

# start frontend
python frontend/hangman.py
```

# API implementation

API is deployed to cloud and can be accessed using following url:
https://hangman-41az.onrender.com/

# Screencast

The screencast is a bit dated with the backend side but contains the explanations of most of the basic code. Updates have been made in the index.py file, with adding scores with POST method from backend, adding password to all http requests, adding sorting options (asc and desc) and adding a limit option. All of the code updates use request.args.get() to get information from the URL parameter and use it to compare, sort or limit information in the backend.

- password to all http requests: the request.args.get('pw') object gets the users given password from the URL parameter and compares it with the stored password
- adding sorting options of asc and desc: the request.args.get('sort') object defines which option is shown
- adding limit option: the request.args.get('limit') object defines how many scores are shown, the default is 50

Link for the screencast:
https://youtu.be/ihH2i7LFbMk
