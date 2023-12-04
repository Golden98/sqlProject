/*
By: Brayden Golden

Purpose: to initilize a database
*/
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'my.goldent3',
    password: 'jyvcbbio',
    database: 'my_goldent3_default'
});

connection.query(
    "DROP TABLE IF EXISTS VIEWS_MOVIE;",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);
connection.query(
    "DROP TABLE IF EXISTS MOVIE;",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "DROP TABLE IF EXISTS PROFILE;",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);


connection.query(
    "DROP TABLE IF EXISTS USER_ACCOUNT;",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "CREATE TABLE USER_ACCOUNT (\
        id SMALLINT(255) UNSIGNED NOT NULL AUTO_INCREMENT,\
        Email VARCHAR(200) NOT NULL,\
        FirstName VARCHAR(50),\
        LastName VARCHAR(50),\
        Phone VARCHAR(15),\
        StreetAddress VARCHAR(100),\
        City VARCHAR(50),\
        State VARCHAR(20),\
        Zip MEDIUMINT(255) UNSIGNED,\
        Salt VARCHAR(20),\
        Hash VARCHAR(64),\
        UNIQUE KEY(Email),\
        PRIMARY KEY(Id)\
    )",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "CREATE TABLE PROFILE (\
        id SMALLINT(255) UNSIGNED NOT NULL AUTO_INCREMENT,\
        Name VARCHAR(50) NOT NULL,\
        AcctID SMALLINT(255) UNSIGNED NOT NULL,\
        PRIMARY KEY(Id),\
        FOREIGN KEY(AcctID) REFERENCES USER_ACCOUNT(id) ON DELETE CASCADE\
    );",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "CREATE TABLE MOVIE (\
        id SMALLINT(255) UNSIGNED NOT NULL AUTO_INCREMENT,\
        Name VARCHAR(50) NOT NULL,\
        YearReleased SMALLINT(255) UNSIGNED,\
        Runtime VARCHAR(10),\
        Description VARCHAR(500),\
        PRIMARY KEY(Id)\
    );",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "CREATE TABLE VIEWS_MOVIE (\
        MovieID SMALLINT(255) UNSIGNED NOT NULL,\
        ProfileID SMALLINT(255) UNSIGNED NOT NULL,\
        PercentComplete TINYINT(255) UNSIGNED,\
        PRIMARY KEY (MovieID, ProfileID)\
        FOREIGN KEY(ProfileID) REFERENCES PROFILE(id) ON DELETE CASCADE\
        FOREIGN KEY(MovieID) REFERENCES MOVIE(id) ON DELETE CASCADE\
    );",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO USER_ACCOUNT VALUES (1, 'email@gmail.com', 'Bob', 'Smith', '7777777', '1337 Wallstreet', 'New York City', 'New York', 33333, 'salt', 'hash');",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO USER_ACCOUNT VALUES (2, 'email2@gmail.com', 'Kimberly', 'Smith', '8888888', '1337 Wallstreet', 'New York City', 'New York', 33333, 'salt', 'hash');",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO PROFILE VALUES (1,'Bob', 1);",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO PROFILE VALUES (2,'Bob jr', 1);",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO PROFILE VALUES (3,'Kim', 2);",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO MOVIE VALUES (1,'300', 2006, '1hr57m','Description');",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO VIEWS_MOVIE VALUES (1, 1, 35);",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.query(
    "INSERT INTO VIEWS_MOVIE VALUES (1, 3, 100);",
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

connection.end();