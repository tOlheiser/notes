# CLI Exercise

**Task**: Create a CLI program that saves and retrieves contacts from an address book.

## Step One: Contacts
Create a contacts.json file to store contact information.

```javascript
{
    "asdasdasd": {
        "firstName": "fred",
        "lastName": "winslow",
        "phoneNumber": "306"
    }
}
```

## Step Two: Install Dependencies
The index.js file has modules that are missing. You can find them in the 'require' statements. npm install 'Commander' and 'Inquirer'.

## Step Three: Complete functions within utils.js

**Read Contacts**

```javascript
// must use the path module for any path outside a require statement.
const contactsLocation = path.join(__dirname, 'contacts.json');

const getContact = () => {
    // read the file and store the contents into 'contacts'.
    const contacts = fs.readFileSync(contactsLocation).toString()
    // parse the string & convert it into a javascript object. 
    return JSON.parse(contacts)
}
```

**Save Contacts**
Get a contacts object and save it to the contacts file. Must decide whether you want to overwrite the file or append to it.

```javascript
const saveContacts = (contacts) => {
    fs.writeFileSync(contactsLocation, JSON.stringify(contacts))
}
```


