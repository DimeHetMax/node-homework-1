const {readContacts, addContact, getContactById, removeContact} = require("./contacts")
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        readContacts().then(data => console.log(data))
        // node index.js -a list 
      break;

    case 'get':
        getContactById(id).then(data => console.log(data))
        // node index.js -a get -i drsAJ4SHPYqZeG-83QTVW 
      break;

    case 'add':
        addContact(name, email, phone).then(data => console.log(data))
        // node index.js -a add -n Max -e dimehinm@gmail.com -p +380677755688 
      break;

    case 'remove':
        removeContact(id).then(data=> console.log(data))
        // node index.js --action remove --id d9c96d03-e51d-465a-8971-3129d28dad88
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);