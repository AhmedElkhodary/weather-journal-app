// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));




/* start Setup Server */

//set port 
const port = 8000;

//set Local Server
const server = app.listen(port, listening);

//callback function
function listening(){
	console.log(`Server running on localhost: ${port}`);
}

/* End Setup Server */


// get route
app.get('/all', getData);

//callback fun
function getData(req, res){
	res.send(projectData);
} 


// post route
app.post('/addData', addData);

//callback fun
function addData(req,res){

	// put data in projectData
    projectData = {
    temp: req.body.temp,
    newDate: req.body.newDate,
    country: req.body.country,    
    feel: req.body.feel
  }
    console.log(projectData);
}

