// https://www.npmjs.com/package/ssh2

const Client = require('ssh2').Client;

const sshClient = new Client();

sshClient.connect({
    host: 'hopper.winthrop.edu',
    port: 22,
    username: 'goldent3',
    privateKey: require('fs').readFileSync('C:/Users/brayd/.ssh/id_rsa')
});

sshClient.on('error', (err) => {
    console.error('Error:', err);
});



const prompt = require('prompt-sync') ({sigint: true});


function ask() {
    let input = prompt('What would you like to do? (create, read, update, or delete)')
    let goodinput = false;
    while (!goodinput) {
        goodinput = true;
        switch (input) {
            case 'create':
                create();
                break;
            case 'read':
                read();
                break;
            case 'update':
                update();
                break;
            case 'delete':
                del();
                break;
            default:
                goodinput = false;
                input = prompt('Please enter create, read, update, or delete.');
        }
    }
}

function create() {
    let email = prompt('Enter an email:');
    let firstName = prompt('Enter a firstName:');
    let lastName = prompt('Enter a lastName:');
    let phone = prompt('Enter a phone:');
    let street = prompt('Enter a street:');
    let city = prompt('Enter a city:');
    let state = prompt('Enter a state:');
    let zip = prompt('Enter a zip:');
    let salt = prompt('Enter a salt:');
    let hash = prompt('Enter a hash:');
};

function read() {
    let choice = prompt('Would you like to enter an email or id?');
    while (choice != 'email' && choice != 'id') {
        choice = prompt('Please either the word \'email\' or \'id\'');
    }
};

function update() {
    let choice = prompt('Would you like to enter an email or id?');
    while (choice != 'email' && choice != 'id') {
        choice = prompt('Please either the word \'email\' or \'id\'');
    }
};

function del() {

}