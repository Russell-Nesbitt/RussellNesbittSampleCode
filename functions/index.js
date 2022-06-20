var firebase = require("firebase/app");
//import firebase from "firebase/app";

const functions = require("firebase-functions");

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin')

const app = express();
app.use(cors({ origin: true }));

var config = {
    apiKey: "AIzaSyAth5o9qVUhAmakZMv9tkA--spNewvXRY8",
    authDomain: "testprojectthree-35546.firebaseapp.com",
    projectId: "testprojectthree-35546",
    storageBucket: "testprojectthree-35546.appspot.com",
    messagingSenderId: "1088335659676",
    appId: "1:1088335659676:web:c17eb687195622c4e22359"
};

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


//admin.initializeApp(functions.config().firebase);

firebase.initializeApp(config);

var database = firebase.database();

function Bird(ID, name, color) 
{
  this.ID = ID;
  this.birdName = name;
  this.birdColor = color;
}

Bird.prototype.toString = function() 
{
  return this.ID + " " + this.birdName + " " + this.birdColor;
}

var birds = [new Bird("001", "Bluebird", "Blue")];

app.get('/', (request, response) => {
  response.send("Birds: " + birds + "\n");
});

app.post('/', (request, response) => {

  var inputID = request.body.ID;
  var inputName = request.body.name;
  var inputColor = request.body.color;

  for (let i = 0; i < birds.length; i++) 
  {
    if (birds[i].ID == inputID) 
    { 
        response.send("Post Request Processed, ID already exists\n");
        return;
      }

  }
  
  var addBird = new Bird(inputID, inputName, inputColor)

  birds.push(addBird);
  response.send('Post Request Processed: ' + addBird + "\n");
});

app.delete('/', (request, response) => {

  var deleteID = request.body.ID;

  for (let i = 0; i < birds.length; i++) 
  {
    if (birds[i].ID == deleteID) 
    {
      delete birds[i];

      const filtered = birds.filter(element => {
        return element !== undefined;
      });

      birds = filtered;

    }
  }

  response.send("Delete Request Processed\n");
});

app.put('/', async (request, response) => {
  var inputID = request.body.ID;
  var newName = request.body.name;
  var newColor = request.body.color;

  for (let i = 0; i < birds.length; i++) 
  {
    if (birds[i].ID == inputID) 
    {
      birds[i].birdName = newName;
      birds[i].birdColor = newColor;
    } 
  }

  response.send("Put Request Processed\n");

});

exports.birds = functions.https.onRequest(app);