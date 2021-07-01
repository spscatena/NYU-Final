document.addEventListener("click", getWeather);

function getWeather(event) {
  if (!event.target.matches("button")) return;
  console.log("button clicked");
  fetch(
    "https://dark-sky.p.rapidapi.com/40.730610,-74.0060,2021-07-01T02:00:00Z",
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
  // .then((data) => console.log(data));
}

function displayWeather(weather) {
  console.log(weather);
  const html = `
      <div class="item">
      <p>${weather.hourly.summary}</p>
      </div>

    `;

  document.querySelector(".stories").innerHTML = html;
  document.querySelector(
    "#weather-message"
  ).innerHTML = `${weather.hourly.summary}`;
}

// function determinBeachDay() {

//   for (let i = 0; i < something.lenth; i++){

//   }

// }

// function showData(stories) {
//   var looped = stories
//     .map(
//       (story) => `
//     <div class="item">
//     <img src=${story.multimedia[0].url}>
//     <h6>${story.multimedia[0].caption}</h6>
//     <h5>${story.byline}</h5>
//     <h3><a href=${story.url} target="_blank">${story.title}</a></h3>
//       <p>${story.abstract}</p>
//     </div>
//   `
//     )
//     .join("");

//   document.querySelector(".stories").innerHTML = looped;
//   console.log(stories);
// }

// const form = document.getElementById("search-form");
// if (form) {
//   form.addEventListener("submit", submitHandler);
// }

// function submitHandler(event) {
//   event.preventDefault();
//   const searchQuery = document.getElementById("search-text").value;
//   console.log(searchQuery);
//   const searchAPI = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=eSmE1FWORSpaCimjXmDe5cGALcFUVDdn`;
//   fetch(searchAPI)
//     .then((response) => response.json())
//     .then((data) => getSearchResults(data));
// }

// function getSearchResults(data) {
//   console.log(data);
//   var parsedREsults = data.response.docs
//     .map((doc) => {
//       const pubDate = new Date(Date.parse(doc.pub_date));
//       return `
//         <div class="item">
//         <h2><a href=${doc.web_url} target="_blank">${doc.headline.main}</a></h2>
//         <h4>${pubDate.toLocaleDateString()}</h4>
//         <p>${doc.abstract}</p>
//         </div>
//       `;
//     })
//     .join("");

//   document.querySelector(".search-results").innerHTML = parsedREsults;
//   }
