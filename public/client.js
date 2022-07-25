


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
const feelsLikeID = document.getElementById("feelsLikeId");


let weatherObject = {};
let isC = false;


// Fetching data from the server to manipulate the DOM
weatherButton.addEventListener('click', () => {
    
    getWeather();

});




// Setting the Farenheit to Celsius (back-and-forth)
tempButton.addEventListener('click',  () => {

    isC = !isC;
    (isC === true) ? convertToCelsius() : convertToFarenheit();

});



farenheitArray = [];
celsiusArray = [];

// setting temperature to Celsius
function convertToCelsius() {

    celsiusArray[0] = helperCelsius(farenheitArray[0]);
    celsiusArray[1] = helperCelsius(farenheitArray[1]);
    celsiusArray[2] = helperCelsius(farenheitArray[2]);
    celsiusArray[3] = helperCelsius(farenheitArray[3]);
    

    tempID.innerHTML = celsiusArray[0] + "&#176";
    lowID.innerHTML = "<i class='fa-solid fa-arrow-down'></i> " + celsiusArray[1] + "&#176";
    hiID.innerHTML = "<i class='fa-solid fa-arrow-up'></i> " +  celsiusArray[2] + "&#176";
    feelsLikeID.innerHTML = "Feels like: " + celsiusArray[3] + "&#176";


}

// setting temperature to Farenheit
function convertToFarenheit() {



    tempID.innerHTML = helperFarenheit(celsiusArray[0]) + "&#176";
    lowID.innerHTML =  "<i class='fa-solid fa-arrow-down'></i> " + helperFarenheit(celsiusArray[1]) + "&#176";
    hiID.innerHTML =  "<i class='fa-solid fa-arrow-up'></i> " +  helperFarenheit(celsiusArray[2]) + "&#176";
    feelsLikeID.innerHTML = "Feels like: " + helperFarenheit(celsiusArray[3]) + "&#176";

}

function helperCelsius(temperature) {


    const celsius  = (temperature - 32) * (5/9);
    return Math.floor(celsius);
}

function helperFarenheit(temperature) {
    const farenheit = (temperature * 9/5) + 32;
    return Math.floor(farenheit);
}





// fetch the data from the server
async function getWeather() {


    let city = inputField.value;
    const weatherResponse =  await fetch(`weather/${city}`);
    const data = await weatherResponse.json();
    
    const weather = data['weather'][0];
    const main = data['main'];


     weatherObject = {
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


    farenheitArray[0] = weatherObject.temp;
    farenheitArray[1] = weatherObject.tempMin;
    farenheitArray[2] = weatherObject.tempMax;
    farenheitArray[3] = weatherObject.feelsLike;
    


    // setting the weather(visually) based on user input
    setWeather(weatherObject);
    
}





function setWeather(weatherObject) {



    const humidityID = document.getElementById("humidityId");
    const pressureID = document.getElementById("pressureID");
    const descriptionID = document.getElementById("descriptionId");
    const iconColor = document.getElementById("iconcolor");
    const cityID = document.getElementById("cityId");


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
            iconColor.className = "fa-solid fa-cloud-showers-heavy fa-10x custom";
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

    // Updating all properties of weather through innerHTML.
    tempID.innerHTML = weatherObject.temp + "&#176";
    lowID.innerHTML = "<i class='fa-solid fa-arrow-down'></i> " +  weatherObject.tempMin + "&#176";
    hiID.innerHTML =  "<i class='fa-solid fa-arrow-up'></i> " + weatherObject.tempMax + "&#176";
    feelsLikeID.innerHTML = "Feels Like: " + weatherObject.feelsLike + "&#176";
    humidityID.innerHTML = "Humidty: " + weatherObject.humidity;
    pressureID.innerHTML = "Pressure: " + weatherObject.pressure;
    descriptionID.innerHTML = weatherObject.description;
    cityID.innerHTML = weatherObject.cityName;
    
    
}
