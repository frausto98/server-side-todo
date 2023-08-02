//import the necessary files
const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRoutes = require('./route/apiRoutes')

//set up the server
const PORT = process.env.PORT || 3005;
const app = express();

// the purpose of this code is so that express reads requested information in it's intended json object format.
app.use(express.json()); 

// the purpose of this code is so that express reads the requested information in it's stringified / array format.
// with extended: true, this function allows the use of the qs library which is a more in-depth URL stringifier.
app.use(express.urlencoded({extended: true}));

// the purpose of this code is so that all the files within the folder are not changed when accessed on a server.
// so, while we may post/create new todo items, we're not actually altering the files even though they're accessed through a server.
app.use(express.static("public"));

app.use('/api', apiRoutes)

// here we tell express that any end point for localHost:3005 will direct us to the homepage.
app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

// here we tell express that the end point "/notes" will direct us to the notes html page.
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// here we tell express to initiate the server on our designated port, specified at 3005.
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));