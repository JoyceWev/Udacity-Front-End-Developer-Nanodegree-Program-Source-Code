let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&APPID=5a0022d0a3d01f08d8587c491a1cc4c1'

document.getElementById('generate').addEventListener('click', performAction);
const feels = document.getElementById('feelings').value;

function performAction(e){
	const enteredCity =  document.getElementById('zip').value;
	getWeather(baseURL,enteredCity,apiKey)
	.then(function(data){
		postData('/addWeather', {city:data.city, feels:feels, temperature:data.temp} )
		console.log(data)
	});
};

const getWeather = async (baseURL, cityplace, key)=>{
	const res = await fetch(baseURL+cityplace+key)
  	try {
		const data = await res.json();
    	return data;
  	}  catch(error) {
    	console.log("error", error);
    	// appropriately handle the error
  	}
};

//Global Variables 
const postData = async ( url='', data = {})=>{
  	const res = await fetch(url, {
  		method: 'POST', 
  		credentials: 'same-origin',
  		headers: {
    		'Content-Type': 'application/json',
  		},
		// Body data type must match "Content-Type" header        
  		body: JSON.stringify(data), 
	});

	try {
    	const newData = await res.json();
    	console.log(newData);
    	return newData;
  	} catch(error) {
  		console.log("error", error);
      // appropriately handle the error
  	}
};


//postData('/addWeather', {temperature:20, score:'Tering warm min vrind',location:'Amsterdam'});
//postData('/addWeather', {temperature:22, score:'WOWIMSOHOT',location:'Nijmegen'});


// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();