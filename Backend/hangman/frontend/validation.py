def is_name(fname, lname):
    """
    Checks if the provided first and last name strings are valid names.
    Args:
        fname (str): The first name string to check.
        lname (str): The last name string to check.
    Returns:
        bool: True if the first and last name strings are valid names, False otherwise.
    """
    if fname[0].isupper() and lname[0].isupper():
        if len(fname) >= 2 and len(lname) >= 2:
            return True
        else:
            return False
    else:
        return False

def check_letter():
    """
    Checks if the provided argument is a single valid letter from A-Z.
    Args:
        letter (str): The letter entered by the user.
    Returns:
        str: The valid letter entered by the user.
    """
    while True:
        letter = input("Enter your guess: ").upper()
        if len(letter) != 1:
            print("Enter only one character at a time")
            continue

        if not letter.isalpha() or letter in "ÅÄÖ": #isalpha() cheks if a character is a letter, doesn't accept Å,Ä or Ö"
            print("Enter only letters A-Z")
            continue
        return letter