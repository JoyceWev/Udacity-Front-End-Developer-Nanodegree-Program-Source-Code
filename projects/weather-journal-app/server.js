
// Setup empty JS object to act as endpoint for all routes
const projectData = [];

/* Dependecies*/
// Require Bodyparser to run server and routes
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,listening);

function listening() {
	//console.log(server);
	console.log("server is running i guess");
    console.log("oh and btw, the port is " + port);
}

app.get('/all', sendData);

// POST method route
app.post('/addWeather', addWeather);

function sendData (req, res) {
	res.send(projectData);
};

function receivedPost (req, res) {
	console.log(res);
	res.send('POST received')
};

function addWeather (req, res) {
	let newEntry = {
		temp: (req.body.temperature.temp-272.15).toFixed(1),
		city: req.body.city.name,
		feels: req.body.feels
	}
	projectData.unshift(newEntry);
	console.log(newEntry);
	res.send(projectData);
}