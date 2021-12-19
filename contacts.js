const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid')

const contactsPath = path.dirname('./db/contacts.json') + '/' + path.basename('../db/contacts.json')
function listContacts() {
    fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse).then(console.table)
    .catch(err=>console.error(err))
}    
    
function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8')
    .then(data=>JSON.parse(data).find(contact=>contact.id === contactId.toString()))
    .then(console.table)
    .catch(err=>console.error(err))    
}

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8')
    .then(data=>JSON.parse(data).filter(contact=>contact.id !== contactId.toString()))
    .then(async contacts=>{
        await fs.writeFile(contactsPath, JSON.stringify(contacts))
        listContacts()
    })
    .catch(err=>console.error(err))    
}

function addContact(name, email, phone) {
    const contact = {
        id: shortid.generate(),
        name,
        email,
        phone
    }
    fs.readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then(async contacts=>{
        await fs.writeFile(contactsPath, JSON.stringify([...contacts, contact]));
        listContacts();
    })
    .catch(err=>console.error(err)); 
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}