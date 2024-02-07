import java.io.*;
import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 * The ContactsApp class provides a simple program for managing contacts.
 * It allows users to create, update, remove and read contacts, by entering 
 * a number (1, 2, 3, 4 or 5) corresponding to the desired action.
 * The class includes methods for creating a new contact, adding a new contact 
 * to the "contacts.txt" file, removing a contact by personal ID, and updating
 * the address and email of a contact by personal ID.
 */

public class ContactsApp {


  static List<Contact> contacts = new ArrayList<Contact>();
  /**
 * Operations are selected by the user through the console.
 * @param args an array of strings that can be passed to the program at runtime
 * as arguments
 */
  public static void main(String[] args) {
    Console c = System.console();
    int value = 0;
    System.out.println("1 = Create, 2 = Update, 3 = Remove, 4 = Read, 5 = Quit");
    value = Integer.parseInt(c.readLine());

    while(value!=5){
        
      if(value == 1) {
        createContact();
        save();
        System.out.println("1 = Create, 2 = Update, 3 = Remove, 4 = Read, 5 = Quit");
        value = Integer.parseInt(c.readLine());
      } 

      else if(value == 2) {
        System.out.println("Personal Id, Address, Email");
        String personalId = c.readLine();
        String address = c.readLine();
        String email= c.readLine();
        updateContact(personalId, address, email);
        break;
      }

      else if(value == 3) {
        String personalId = c.readLine();
        removeContact(personalId);
        break;
      }

      else if(value == 4) {
        readContact();
        System.out.println("1 = Create, 2 = Update, 3 = Remove, 4 = Read, 5 = Quit");
        value = Integer.parseInt(c.readLine());
      }

      else if(value == 5) {
      }

    }

    System.out.println("Bye!");
  }
    

 /**
  * Creates a new contact and adds it to the list of contacts. 
  * The user is promted to enter the contact's personal ID, first name,
  * last name, phone number, address and email.
  * The new contatc is then saved to the contacts list.
 */   

  public static void createContact(){
    Console c = System.console();
    Contact a = new Contact();
    System.out.println("Give Id");
    String id = c.readLine();

    a.setPersonalId(id);

    System.out.println("Give First Name");
    String firstName = c.readLine();

    a.setFirstName(firstName);

    System.out.println("Give Last Name");
    String lastName = c.readLine();

    a.setLastName(lastName);

    System.out.println("Give phone number");
    String phoneNumber = c.readLine();

    a.setPhoneNumber(phoneNumber);

    System.out.println("Give Address");
    String address = c.readLine();

    a.setAddress(address);

    System.out.println("Give email");
    String email = c.readLine();

    a.setEmail(email);

    contacts.add(a);
    addContact(a);

    save();
  }

/**
 * Adds a new Contact to the "contacts.txt" file.
 * @param contact The contact object to be added
 */


  public static void addContact(Contact contact) {
    contacts.add(contact);
    try (FileWriter fw = new FileWriter("contacts.txt",true)){
      fw.write("\n| personal id  | " + contact.getPersonalId() + "        \n");
      fw.write("| first name   | " + contact.getFirstName() + "           \n");
      fw.write("| last name    | " + contact.getLastName() + "            \n");
      fw.write("| phone number | " + contact.getPhoneNumber() + "         \n");
      fw.write("| address      | " + contact.getAddress() + "             \n");
      fw.write("| e-mail       | " + contact.getEmail() + "               \n");
      fw.flush();
      /** 
      * @throws IOException If an IO error occurs while writing to the file.
      */
    } catch (IOException e) {
      
    }
  }

  /**
   * Removes a contact from the list of contacts by personal ID
   * @param personalId the personal ID of the contact to remove
   */

  public static void removeContact(String personalId) {
    for (int i = 0; i < contacts.size(); i++) {
      if (contacts.get(i).getPersonalId().equals(personalId)) {
        contacts.remove(i);
        break;
      }
    }
  }

/**
 * Updates the address and email of contact in the list of contacts 
 * by personal ID
 * @param personalId the personal ID of the contact to update
 * @param address the new address of the contact
 * @param email the new email of the contact
 */

  public static void updateContact(String personalId, String address, 
    String email) {
      for (int i = 0; i < contacts.size(); i++) {
        if (contacts.get(i).getPersonalId().equals(personalId)) {
        contacts.get(i).setAddress(address);
        contacts.get(i).setEmail(email);
        break;
        }
      }
  }


/**
 * Reads the contents of the contacts.txt file and prints each 
 * line to the console.
 */

  public static void readContact() {
    try {
        BufferedReader reader = new BufferedReader(new FileReader("contacts.txt"));
        String line = reader.readLine();
        while (line != null) {
            System.out.println(line);
            line = reader.readLine();
        }
        reader.close();

 /* 
  * @throws IOException If IO error occurs while reading the file. 
  */
    } catch (IOException e) {
      
    }
  }

/**
 * Retrieves a contact from the list of contacts by personal ID
 * @param personalId the personal ID of the contact to retrieve
 * @return the contact with the specified personal ID, or null if not found
 */

  public Contact getContact(String personalId) {
    for (int i = 0; i < contacts.size(); i++) {
      if (contacts.get(i).getPersonalId().equals(personalId)) {
        return contacts.get(i);
      } 
    }
    return null;
  }

  /**
 * Saves the contact information to a file named "contacts.txt"
 */

  public static void save() {
    try (FileWriter fw = new FileWriter("contacts.txt")) {
      for (Contact contact : contacts) {
        fw.write("| personal id  | " + contact.getPersonalId() + "       \n");
        fw.write("| first name   | " + contact.getFirstName() + "        \n");
        fw.write("| last name    | " + contact.getLastName() + "         \n");
        fw.write("| phone number | " + contact.getPhoneNumber() + "      \n");
        fw.write("| address      | " + contact.getAddress() + "          \n");
        fw.write("| e-mail       | " + contact.getEmail() + "            \n");
        fw.write("" + "\n");
      }
      fw.flush();

  /* 
   * @throws IOException If IO error occurs while reading the file. 
   */    
    }  catch (IOException e) {
      System.out.println("Error saving file: " + e.getMessage());
    }
  }
}

/**
 * The Contact class representing a contact with its details such as
 * personal id, first name, last name, phone number, address and email.
 * It has getter for each of these details
 */

class Contact {
  private String personalId;
  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String address;
  private String email;

/**
 * Returns the fpersonal id of the person.
 * @return the personal id of the person
 */

  public String getPersonalId() {
      return personalId;
  }

/**
 * Returns the first name of the person.
 * @return the first name of the person
 */

  public String getFirstName() {
      return firstName;
  }

/**
 * Returns the last name of the person.
 * @return the last name of the person
 */

  public String getLastName() {
      return lastName;
  }

/**
 * Returns the phone number of the person.
 * @return the phone number of the person
 */

  public String getPhoneNumber() {
      return phoneNumber;
  }

/**
 * Returns the address of the person.
 * @return the address of the person
 */

  public String getAddress() {
      return address;
  }

/**
 * Returns the email of the person.
 * @return the email of the person
 */

  public String getEmail() {
      return email;
  }

/**
 * Sets the address of the person.
 * @param address the address to set.
 */

  public void setAddress(String address) {
    this.address = address;
  }

/**
 * Sets the email of the person.
 * @param email the email to set.
 */

  public void setEmail(String email) {
    this.email = email;
  }

/**
 * Sets the personal id of the person.
 * @param personalid the personal id to set.
 */

  public void setPersonalId(String personalId) {
    this.personalId = personalId;
  }


/**
 * Sets the first name of the person.
 * @param firstname the first name to set.
 */

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

/**
 * Sets the last name of the person.
 * @param lastname the last name to set.
 */

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

/**
 * Sets the phone number of the person.
 * @param phonenumber the phone number to set.
 */

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
}
 