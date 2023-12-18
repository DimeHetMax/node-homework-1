const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname,"db", 'contacts.json');

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    } else {
      throw error;
    }
  }
};
// readContacts().then(data => console.log(data,"<====data"))

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contactById = contacts.filter(contact => contact.id === contactId)
  if(contactById.length === 0){
    return null
  }
  const [contact]=contactById;
  return contact;
}

// const nnnn = getContactById("qdggE76Jtbfd9eWJHrssH").then(data => console.log(data, "<=>"))
// console.log(nnnn, "<======= getContactById")

const removeContact = async (contactId) => {
  const contacts = await readContacts(); 

  // const contactsss = contacts.filter(contact => contact.id !== contactId)

  const deletedContact = contacts.find(contact => contact.id === contactId)
  const index = contacts.findIndex(contact => contact.id === contactId)
  if(index === -1) return null;
  contacts.splice(index,1)
  await writeContacts(contacts);
  return deletedContact;
}
// removeContact("d9c96d03-e51d-465a-8971-3129d28dad88").then(data=> console.log(data, "<====== result"))


const writeContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data);
};


const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const id = uuidv4()
  const newContact = {id, name, email, phone}
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};
// addContact("Max Dimekhin", "dimehinm@gmail.com", "+380(677)-755-688").then(data => console.log(data, "<======= newContact"))


module.exports = { readContacts, addContact, getContactById, removeContact};
