const functions = require("firebase-functions");
var admin = require('firebase-admin');


exports.sayHello = functions.https.onCall((data, context) => {
    const name = data.name;
    return `hello ${name} :)`;
});