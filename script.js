const apikey = "96631abe744d769ba798bcd9da45711d";

const searchBox = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon"); 


async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        
        const weather = data.weather[0].main.toLowerCase(); 

        if (weather === "cloudy") {
            weatherIcon.src = "Images/cloudy.png";
        } else if (weather === "clear") {
            weatherIcon.src = "Images/clear.png";
        } else if (weather === "rain") {
            weatherIcon.src = "Images/rain.png";
        } else if (weather === "drizzle") {
            weatherIcon.src = "Images/drizzle.png";
        } else if (weather === "mist") {
            weatherIcon.src = "Images/mist.png";
        } 
        else if (weather === "snow") {
            weatherIcon.src = "Images/snow.png";
        } 
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error:", error.message);
        alert("City not found. Try again.");
    }
}


searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

checkWeather("Karachi");
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});
