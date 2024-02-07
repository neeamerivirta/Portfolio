# project-work-merivirta-neea

This code is a simple contacts app written in Java. The app allows users to create, update, remove and read contacts.

Application run using following commands: cd src/ && javac \*.java && java ContactsApp

The main method prompts the user to select an option (1 = Create, 2 = Update, 3 = Remove, 4 = Read, 5 = Quit), and based on the user's input, the corresponding function is called.

1. The create- function prompts the user to enter information for a new contact, which is then added to the contacts list.

- Enter the required information

2. The update- function takes a personal Id, address, and email as input and updates the corresponding contact's address and email in the contacts list. (Does not work as expected)

- Enter the information you want to update from the contact information

3. The remove- function takes a personal Id as input and removes the corresponding contact from the contacts list. (Does not work as expected)

- Delete information from contacts

4. The read- function shows all saved contact information on the screen.

- Read all existing contacts

5. The quit- function quit the application and print's "Bye!".

- Close the application when you finish.

The app also has a save- function, which writes the contacts list to a text file called "contacts.txt."
