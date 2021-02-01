/* Global Variables */
const apiKey  = 'da9448495ffc258151827b9f11abdb12'; // put your Api key
// the baseUrl to get data from Api (you need to manipulate it)
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}'

// Event listen to click in generate button
document.getElementById('generate').addEventListener('click', performAction);

//perform function acting when button clicked 
function performAction(e){

	/* Select values from Html */ 
	const newZipCode = document.getElementById('zip').value;
	const feel =  document.getElementById('feelings').value;

	// Create a new date instance dynamically with JS
	let d = new Date();
	let newDate = d.getDate() + '-' + (d.getMonth() + 1 ) + '-' + d.getFullYear();
	
	// Api url manipulated (Celsius)
	const URL =`http://api.openweathermap.org/data/2.5/weather?zip=${newZipCode}&appid=${apiKey}&units=metric`;
	
	// call getApi fun
	getApi(URL)

	//wait for get data from Api is finished
	.then(function(data){

		// select temp from all Return Api Data
		const temp = data.main.temp;
		const country = data.sys.country;
		console.log(country);

		// add data to the post requst
		postData('/addData',{temp: temp, newDate: newDate, country: country, feel: feel} );	

		//update  element content
		updateUI() 	
	}) 	
}


// get Api fun that Deal with Api  
const getApi = async (url)=>{
	
	const res   = await fetch(url)
  	try {
    	const data = await res.json();
    	return data;

  	}catch(error) {
    	console.log("error", error);
  	}
}


// postData function to make post request to save the data 
const postData = async ( url = '', data = {})=>{
  
    const response = await fetch(url, {
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    credentials: 'same-origin', // include, *same-origin, omit
	    headers: {
	        'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data), // body data type must match "Content-Type" header        
	});
    try {
    	const newData = await response.json();
      	return newData
    }catch(error) {
	    console.log("error", error);
    }
}


// updateUI function that get data from server and put it in Html
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    
    // put data to Html 
    document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temp  + '°C';
    document.getElementById('date').innerHTML = 'Date: ' + allData.newDate;
    document.getElementById('country').innerHTML = 'Country: ' + allData.country;
    document.getElementById('content').innerHTML = allData.feel;

  }catch(error){
    console.log("error", error);
  }
}
 


