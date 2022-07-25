


// id's of HTML elements
const weatherButton = document.getElementById("btnWeather");
const tempButton = document.getElementById("tempBtn");
const inputField = document.getElementById("inputId");
const cardId  = document.getElementById("cardId");
const weatherInfo = document.getElementById("infoId");


// temperatures
const tempID = document.getElementById("tempId");
const hiID = document.getElementById("hiId");
const lowID = document.getElementById("lowId");
const feelsLikeId = document.getElementById("feelsLikeId");


// Fetching data from the server to manipulate the DOM
weatherButton.addEventListener('click', () => {
    
    getWeather();

});


let isC = false;

// Setting the Farenheit to Celsius (back-and-forth)
tempButton.addEventListener('click',  () => {

    isC = !isC;

    (isC === true) ? convertToCelsius() : convertToFarenheit();

});


function convertToCelsius() {

    

}

function convertToFarenheit() {

}

// fetch the data from the server
async function getWeather() {


    let city = inputField.value;
    const weatherResponse =  await fetch(`weather/${city}`);
    const data = await weatherResponse.json();
    
    const weather = data['weather'][0];
    const main = data['main'];
//    const statusCode = data['cod'];



    const weatherObject = {
        cityName : city,
        description : weather.description,
        weatherIcon : weather.icon,
        temp : main.temp,
        tempMin : main.temp_min,
        tempMax : main.temp_max,
        feelsLike : main.feels_like,
        pressure : main.pressure,
        humidity : main.humidity
    }

    // setting the weather(visually) based on user input
    setWeather(weatherObject);
    
}





function setWeather(weatherObject) {


  
    const humidityID = document.getElementById("humidityId");
    const pressureID = document.getElementById("pressureID");
    const descriptionID = document.getElementById("descriptionId");
    const iconColor = document.getElementById("iconcolor");


    switch(weatherObject.description) {
        case "clear sky":
            iconColor.className = "fa-solid fa-sun fa-spin fa-10x custom";
            break;
        case "few clouds":
            iconColor.className = "fa-solid fa-cloud-sun fa-10x custom";
            break;
        case "scattered clouds":
        case "broken clouds":
            iconColor.className = "fa-solid fa-cloud fa-10x custom";
             break;
        case "shower rain":
            iconColor.className = "fa-solid fa-showers-heavy fa-10x custom";
            break;
        case "rain":
            iconColor.className = "fa-solid fa-cloud-rain fa-10x custom";
            break;
        case "thunderstorm":
            iconColor.className = "fa-solid fa-cloud-bolt fa-10x custom";
            break;
        case "snow":
            iconColor.className = "fa-solid fa-snowflake fa-10x custom";
            break;
        case "mist":
            iconColor.className = "fa-solid fa-smog custom";
            break;
        default:
            console.log("Unknown weather");
            break;

    }



    // console.log(icon.substring(0,2));

   //  iconImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    tempID.innerHTML = weatherObject.temp + "&#176";
    lowID.innerHTML = "Low: " + weatherObject.tempMin + "&#176";
    hiID.innerHTML = "Hi: " + weatherObject.tempMax + "&#176";
    feelsLikeId.innerHTML = "Feels Like: " + weatherObject.feelsLike + "&#176";
    humidityID.innerHTML = "Humidty: " + weatherObject.humidity;
    pressureID.innerHTML = "Pressure: " + weatherObject.pressure;
    descriptionID.innerHTML = weatherObject.description;
    document.getElementById("cityId").innerHTML = weatherObject.cityName;
    






    
}
