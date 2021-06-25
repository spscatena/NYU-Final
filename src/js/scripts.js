document.addEventListener("click", clickHandlers);

// store the link plus the API key in a variable
const key = "uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;

console.log(API);

function clickHandlers(event) {
  if (!event.target.matches("button")) return;
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

// function showData(stories) {
//   console.log(stories[0].title);
//   var looped = "";
//   for (let story of stories) {
//     looped += `
//     <div class="item">
//       <h3>${story.title}</h3>
//       <p>${story.abstract}</p>
//     </div>
//     `;
//     console.log(looped);
//   }
//   document.querySelector(".stories").innerHTML = looped;
// }

function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
      <h3>${story.title}</h3>
      <p>${story.abstract}</p>
      <p>${caption ? caption : "no caption"}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}

/*
Add:
1. author
2. an image
3. caption
*/
