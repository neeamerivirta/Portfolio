import random
import json

from validation import *

def read_database():
    """
    Reads data from the 'words.txt' file.
    Returns:
    str: Contents of the file as a string.
    """
    file = open("words.txt")
    file.close
    return file.read()

def file_to_list(input):
    """
    Takes a string as input and changes it to a newline-separated (\n) list of strings.
    Args:
    input (str): The input string to be converted to list.
    Returns:
    list: A list of strings created from the input string.
    """
    list = input.split("\n")
    return(list)

def get_fullname():
    """
    Asks for player's first and last name.
    Returns:
    str: Player's full name in the format 'firstname lastname'.
    """
    print("Congrats you won all 3 games!")
    print("Please enter your name for the highscore list")
    while True:
        fname = input("Enter firstname: ")
        lname = input("Enter lastname: ")
        if is_name(fname, lname):
            break
        else:
            print("Invalid name")
    return f"{fname} {lname}"