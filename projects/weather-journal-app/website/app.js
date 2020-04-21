let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&APPID=5a0022d0a3d01f08d8587c491a1cc4c1'

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	const enteredCity =  document.getElementById('zip').value;
  const enteredCountry =  document.getElementById('country').value;
  const newZip = enteredCity+','+enteredCountry
  let feels = document.getElementById('feelings').value;
	getWeather(baseURL,newZip,apiKey)
	.then(function(data){
		postData('/addWeather', {city:data.city, feels:feels, temperature:data.list[0].main});
    updateUI();
  });
};

const getWeather = async (baseURL, cityplace, key)=>{
	const res = await fetch(baseURL+cityplace+key)
  	try {
		  const data = await res.json();
    	return data;
  	} catch(error) {
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
    	return newData;
  	} catch(error) {
  		console.log("error", error);
      // appropriately handle the error
  	}
};

// Create a new date instance dynamically with JS
let date = new Date();
let options = { weekday: 'long'};
let newDate = new Intl.DateTimeFormat('en-US', options).format(date)+' '+ date.getDate() +'.'+ date.getMonth() +'.'+ date.getFullYear();

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    document.getElementById('entryHolder').style.backgroundColor = "#FFF";
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Date: '+newDate;
    document.getElementById('temp').innerHTML = 'Temperature: '+allData[0].temp + '°C';
    document.getElementById('city').innerHTML = 'Location: '+allData[0].city;
    document.getElementById('content').innerHTML = allData[0].feels;
    console.log(allData);

  }catch(error){
    console.log("error", error);
  }
};


