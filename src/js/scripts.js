document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
const key = "eSmE1FWORSpaCimjXmDe5cGALcFUVDdn";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;

console.log(API);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
    <img src=${story.multimedia[0].url}>
    <h6>${story.multimedia[0].caption}</h6>
    <h5>${story.byline}</h5>
    <h3><a href=${story.url} target="_blank">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
  console.log(stories);
}

const form = document.getElementById("search-form");
if (form) {
  form.addEventListener("submit", submitHandler);
}

function submitHandler(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("search-text").value;
  console.log(searchQuery);
  const searchAPI = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=eSmE1FWORSpaCimjXmDe5cGALcFUVDdn`;
  fetch(searchAPI)
    .then((response) => response.json())
    .then((data) => getSearchResults(data));
}

function getSearchResults(data) {
  console.log(data);
  var parsedREsults = data.response.docs
    .map((doc) => {
      const pubDate = new Date(Date.parse(doc.pub_date));
      return `
        <div class="item">
        <h2><a href=${doc.web_url} target="_blank">${doc.headline.main}</a></h2>
        <h4>${pubDate.toLocaleDateString()}</h4>
        <p>${doc.abstract}</p>
        </div>
      `;
    })
    .join("");

  document.querySelector(".search-results").innerHTML = parsedREsults;
}
