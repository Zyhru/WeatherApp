if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const port = 3000;

const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.use(express.static('public'));


api_key = process.env.API_KEY;



app.get('/weather/:city',  async (req,res) => {

   // recieving the city from the client
    const requestCity = req.params.city
    console.log("City requested by client: ", requestCity);
    
    
  
       // fetching data from api 
      const fetchAPI = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${requestCity}&lat=0&lon=0&id=2172797&lang=null&units=imperial`
      ,{
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': api_key,
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
        })
  
  
      // Response from Open Weather API 

        const weatherResponse = await fetchAPI.json();
        console.log(weatherResponse);
        res.json(weatherResponse);




  
    
     
  

  
   
 

    
});

app.listen(port, () =>  {
    console.log(`App is listening on port ${port}`);
});