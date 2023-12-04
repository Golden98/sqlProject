const prompt = require('prompt-sync') ({sigint: true});
const mysql = require('mysql2');

var connection = connect();

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'my.goldent3',
//     password: 'jyvcbbio',
//     database: 'my_goldent3_default'
// });

// connection.execute('SELECT ? AS test;', ['FirstName'], (err, res, fields) => {
//     console.log("it ran");
//     console.log(err);
//     console.log(res);
//     console.log(fields);
// });
//ask();

ask();

function ask() {
    let input = prompt('What would you like to do? (create, read, update, delete, or done) ')
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
            case 'done':
                process.exit(0);
                break;
            default:
                goodinput = false;
                input = prompt('Please enter create, read, update, delete, or done. ');
        }
    }
}

function create() {
    let email = prompt('Enter an email: ');
    let firstName = prompt('Enter a firstName: ');
    let lastName = prompt('Enter a lastName: ');
    let phone = prompt('Enter a phone: ');
    let street = prompt('Enter a street address: ');
    let city = prompt('Enter a city: ');
    let state = prompt('Enter a state: ');
    let zip = prompt('Enter a zip: ');
    while(!Number.isInteger(Number(zip))) {
        zip = prompt("zip must be an integer: ")
    }
    zip = Number(zip);
    if (Number.isNaN(zip)) zip = 0;
    let salt = prompt('Enter a salt: ');
    let hash = prompt('Enter a hash: ');
    
    connection.ping();
    connection.execute(
        "INSERT INTO USER_ACCOUNT VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [email, firstName, lastName, phone, street, city, state, zip, salt, hash],
        function(err, rows) {
            console.log(err || "");
            console.log(rows);
            ask();
        }
    );
};

function read() {
    let choice = prompt('Would you like to enter an email or id? ');
    while (choice != 'email' && choice != 'id') {
        choice = prompt('Please either the word \'email\' or \'id\' ');
    }
    if (choice == 'email') {
        let email = prompt('Enter an email: ');
        connection.ping();
        connection.execute(
            "select * from USER_ACCOUNT where email = ?",
            [email],
            function(err, rows) {
                console.log(err || "");
                console.log(rows);
                ask();
            }
        );
    } else {
        let id = prompt('Enter an id: ');
        connection.ping();
        connection.execute(
            "select * from USER_ACCOUNT where id = ?",
            [id],
            function(err, rows) {
                console.log(err || "");
                console.log(rows);
                ask();
            }
        );
    }
};

function update() {
    let choice = prompt('Would you like to identify the entry to be updated by an email or id? ');
    while (choice != 'email' && choice != 'id') {
        choice = prompt('Please either the word \'email\' or \'id\' ');
    }
    let ogemail, id;
    if (choice == 'email') {
        ogemail = prompt('Enter an email: ');
    } else {
        id = prompt('Enter an id: ');
    }

    console.log("For each column enter either the value to update to, or leave blank");
    let email = prompt('Enter an email: ');
    let firstName = prompt('Enter a firstName: ');
    let lastName = prompt('Enter a lastName: ');
    let phone = prompt('Enter a phone: ');
    let street = prompt('Enter a street address: ');
    let city = prompt('Enter a city: ');
    let state = prompt('Enter a state: ');
    let zip = prompt('Enter a zip: ');
    while(!Number.isInteger(Number(zip)) && zip != "") {
        zip = prompt("zip must be an integer: ");
    }
    if (zip != "") zip = Number(zip);
    let salt = prompt('Enter a salt: ');
    let hash = prompt('Enter a hash: ');

    let vals = [];
    let qstring = "";
    if (email) {
        qstring += "Email = ?,";
        vals.push(email);
    }
    if (firstName) {
        qstring += "FirstName = ?,";
        vals.push(firstName);
    }
    if (lastName) {
        qstring += "LastName = ?,";
        vals.push(lastName);
    }
    if (phone) {
        qstring += "Phone = ?,";
        vals.push(phone);
    }
    if (street) {
        qstring += "StreetAddress = ?,";
        vals.push(street);
    }
    if (city) {
        qstring += "City = ?,";
        vals.push(city);
    }
    if (state) {
        qstring += "State = ?,";
        vals.push(state);
    }
    if (zip) {
        qstring += "Zip = ?,";
        vals.push(zip);
    }
    if (salt) {
        qstring += "Salt = ?,";
        vals.push(salt);
    }
    if (hash) {
        qstring += "Hash = ?,";
        vals.push(hash);
    }

    if (qstring.charAt(qstring.length-1) == ',') { // else nothing was updated
        qstring = qstring.substring(0, qstring.length-1); // take off last comma
        if (choice == 'email') {
            qstring += " where Email = ?"
            vals.push(ogemail);
        } else {
            qstring += " where id = ?"
            id = Number(id);
            vals.push(id);
        }
        console.log(qstring);
        connection.ping();
        connection.execute(
            "update USER_ACCOUNT set " + qstring,
            vals,
            function(err, rows) {
                console.log(err || "");
                console.log(rows);
                ask();
            }
        );


    } else {
        ask();
    }
};

function del() {
    let choice = prompt('Would you like to enter an email or id? ');
    while (choice != 'email' && choice != 'id') {
        choice = prompt('Please either the word \'email\' or \'id\' ');
    }
    if (choice == 'email') {
        let email = prompt('Enter an email: ');
        connection.ping();
        connection.execute(
            "delete from USER_ACCOUNT where email = ?",
            [email],
            function(err, rows) {
                console.log(err || "");
                console.log(rows);
                ask();
            }
        );
    } else {
        let id = prompt('Enter an id: ');
        connection.ping();
        connection.execute(
            "delete from USER_ACCOUNT where id = ?",
            [id],
            function(err, rows) {
                console.log(err || "");
                console.log(rows);
                ask();
            }
        );
    }
}


function connect() {
    console.log("connection established")
    return mysql.createConnection({
        host: 'localhost',
        user: 'my.goldent3',
        password: 'jyvcbbio',
        database: 'my_goldent3_default'
    });
}