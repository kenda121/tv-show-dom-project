//You can edit ALL of the code here
const rootElem = document.getElementById("root");
function setup() {
  /*const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);*/

  let searchbutton = document.querySelector("#searchplace");
  searchbutton.addEventListener("keyup", searchfunction);

  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      createDropDownList(episodeList);
    });
}

function searchfunction() {
  let searchbutton = document.querySelector("#searchplace");
  console.log(searchbutton.value);
  const allEpisodes = getAllEpisodes();
  let filterepisode = allEpisodes.filter(filtersearch);
  makePageForEpisodes(filterepisode);
}
function filtersearch(episode) {
  let searchbutton = document.querySelector("#searchplace");
  console.log(searchbutton.value);
  rootElem.innerHTML = "";
  if (episode.name.toLowerCase().includes(searchbutton.value.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.replaceChildren([]);
  episodeList.forEach(episodecard);
}

function episodecard(episode) {
  let card = document.createElement("div");
  card.className = "cardepisodes";
  rootElem.appendChild(card);

  //episode code
  let episodecode = document.createElement("h3");
  episodecode.innerText = "S" + "0" + episode.season + "E" + episode.number;
  console.log(episodecode);
  card.appendChild(episodecode);

  //card Title
  let cardtitle = document.createElement("h1");
  cardtitle.innerText = episode.name;
  card.appendChild(cardtitle);

  //image
  let images = document.createElement("img");
  images.src = episode.image.medium;
  images.alt = episode.name;
  images.name = episode.name;
  console.log(images);
  images.className = "imagecenter";
  card.appendChild(images);

  //<p>
  let paraspan = document.createElement("span");
  let paragraph = document.createElement("p");
  paraspan.innerHTML = episode.summary;
  console.log(paragraph);
  card.appendChild(paraspan);
}

function optionsForEpisode(episode) {
  let select = document.getElementById("dropMenu");
  let option = document.createElement("option");
  option.value = episode.name;
  option.innerText = episode.name;
  select.appendChild(option);
}
function createDropDownList(episodes) {
  episodes.forEach(optionsForEpisode);
  eventForEpisodeDropDown(episodes);
}
function eventForEpisodeDropDown(episodes) {
  let selectId = document.getElementById("dropMenu");
  selectId.addEventListener("change", function () {
    let optionElement = document.querySelectorAll("option");
    let names = [];
    optionElement.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selectId.value === name);
    let oneSelectedEpisode = episodes.filter(
      (episode) => episode.name == selectedName
    );
    if (oneSelectedEpisode.length === 1) {
      makePageForEpisodes(oneSelectedEpisode);
    } else {
      makePageForEpisodes(episodes);
    }
  });
}
window.onload = setup;
