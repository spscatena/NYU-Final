document.addEventListener("click", getLocation);

function getWeather(longitude, latitude) {
  const datePicker = document.getElementById("date-picker").value;
  console.log(datePicker);

  fetch(
    `https://dark-sky.p.rapidapi.com/${latitude},${longitude},${datePicker}T00:00:00Z`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "51dca4278fmsh6c701f259ac22d4p1274dajsn501e7e39e747",
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

// prettier-ignore
function displayWeather(weather) {
  const html = `
      <div class="item">
      <p>${weather.hourly.summary}</p>
      <p>High Temp: ${weather.daily.data[0].temperatureHigh}</p>
      <p>Low Temp: ${weather.daily.data[0].temperatureLow}</p>
      </div>
    `;

  document.querySelector(".stories").innerHTML = html;
  console.log(weather);
  let hourlySummary = weather.hourly.icon;
  if (hourlySummary === "rain") {
    document.querySelector("#hourly-result").innerHTML = "Beach Bummer, It's going to rain!"
    document.querySelector("body").style.backgroundImage = 'url("https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy-downsized.gif")';
  }
  if (hourlySummary !== "rain" && weather.daily.data[0].temperatureHigh > 70) {
    document.querySelector("#hourly-result").innerHTML = "Beach Betty, No rain in the forecast!"
    document.querySelector("body").style.backgroundImage = 'url("https://media.giphy.com/media/KV1s4kSJHaY3m/source.gif")';

  }
  if (hourlySummary !== "rain" && weather.daily.data[0].temperatureHigh < 70) {
    document.querySelector("#hourly-result").innerHTML = "Beach Bummer, It might be too chilly!"
  }


}

function getLocation(event) {
  if (!event.target.matches("button")) return;
  event.preventDefault();
  const zipQuery = document.getElementById("user-input").value;
  console.log(zipQuery);
  fetch(
    `https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode?zipcode=${zipQuery}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "51dca4278fmsh6c701f259ac22d4p1274dajsn501e7e39e747",
        "x-rapidapi-host": "vanitysoft-boundaries-io-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => getCoordinates(data));
}

function getCoordinates(zip) {
  console.log(zip);
  const longitude = zip.features[0].geometry.coordinates[0][0][0];
  const latitude = zip.features[0].geometry.coordinates[0][0][1];
  const city = zip.features[0].properties.city;
  const state = zip.features[0].properties.state;
  const displayCityState = `<h2>${city}, ${state}</h2>`;
  document.querySelector("#location").innerHTML = displayCityState;

  getWeather(longitude, latitude);
}
