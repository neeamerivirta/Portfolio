import time
import math
import requests
from text_helper import *
from validation import *

def start_game(games_played):
# The word of the game is drawn from the list (words.txt)
    game_word = random.choice((file_to_list(read_database()))).upper()
    guesses = 0
    letters_guessed = []

# The main game loop prints the Hangman image and counts the number of guesses and games
    while(True):
        hangman_graphic(guesses)
        
        # Prints lines or letters
        for gameword_letter in game_word:
            if gameword_letter in letters_guessed:
                print(gameword_letter, end = " ")
            else:
                print("_", end = " ")

        print("")
        letter = check_letter()

        if letter in game_word:
            letters_guessed.append(letter) # Add the letter to the list if it's in the word
            if set(letters_guessed) == set(game_word):
                print("You won!")
                games_played += 1
                return games_played

        else:   # If the letter is not in the word, guesses are added
            guesses += 1
            if guesses == 6:
                print("You lost :(")
                games_played += 4   # + 4 that the entire game loop is interrupted after a loss
                return games_played

def hangman_graphic(guesses):
    if guesses == 0:
        print("__      ")
        print("|      |      ")
        print("|             ")
        print("|             ")
        print("|             ")
        print("|             ")
    elif guesses == 1:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|             ")
        print("|             ")
        print("|             ")
    elif guesses == 2:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|     /       ")
        print("|             ")
        print("|             ")
    elif guesses == 3:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|     /|      ")
        print("|             ")
        print("|             ")
    elif guesses == 4:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|     /|\     ")
        print("|             ")
        print("|             ")
    elif guesses == 5:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|     /|\     ")
        print("|     /       ")
        print("|             ")
    else:
        print("__      ")
        print("|      |      ")
        print("|      0      ")
        print("|     /|\     ")
        print("|     / \     ")
        print("|             ")

def main():
    while True:
        print("Hello! Would you like to:")
        print("1) Play game")
        print("2) Display high scores")
        print("3) Quit")
        action = input("Make your decision :")
    
        match action:
            case "1":
            # Timer
                tic = time.perf_counter()   # Time when the task is started
                games_played = 0
                while(games_played < 3): # The whole game loop, 3 games are played if you win
                    games_played = start_game(games_played)
                toc = time.perf_counter()   # Time when the task is finished
                score = math.floor((toc - tic) * 10000) / 10000 # math.floor() function rounds down the score to the nearest integer, and then the result is divided by 10000 to get a floating-point value rounded down to 4 decimals
                if games_played == 3:
                    new_data = {
                        "score":str(score),
                        "name":get_fullname()
                    }
                    requests.post('http://127.0.0.1:5000',data = new_data)
                    print("You can find your score on the website now!")
                    print("")
                else:
                    print("")

            case "2":
                response = requests.get('http://127.0.0.1:5000/highscores/json')
                if response.status_code == 200:
                    scores = response.json()
                    print("")
                    print("Here are the scores!")
                    print("")
                    for score in scores:
                        print(score["score"], score["name"])
                    print("")

                else:
                    print("Error fetching the scores")
                    print("")

            case "3":
                print("Bye bye")
                break

            case _:
                print("Input number 1 or 2")

if __name__ == "__main__":
    main()