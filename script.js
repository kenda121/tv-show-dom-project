//You can edit ALL of the code here
const rootElem = document.getElementById("root");

function setup() {
  /*const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);*/
  makeshowpage(getAllShows());
  const linkshow = document.getElementById("linktoshow");
  linkshow.addEventListener("click", addpageshow);
  function addpageshow() {
    const hideepisode = document.getElementById("episodepage");
    hideepisode.hidden = false;
    fetch("https://api.tvmaze.com/shows/1632/episodes")
      .then((response) => response.json())
      .then((episodeList) => {
        makePageForEpisodes(episodeList);
        createDropDownList(episodeList);
        makeshowpage(showList);
      });

    const sohwpage = document.getElementById("showpage");
    sohwpage.hidden = true;
  }

  let searchbutton = document.querySelector("#searchplace");
  searchbutton.addEventListener("keyup", searchfunction);
  const hideepisode = document.getElementById("episodepage");
  hideepisode.hidden = true;
  /*fetch("https://api.tvmaze.com/shows/1632/episodes")
    .then((response) => response.json())
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      createDropDownList(episodeList);
    });*/
}

//search button
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
//create episode card
function episodecard(episode) {
  let card = document.createElement("div");
  card.className = "cardepisodes";
  rootElem.appendChild(card);

  //episode code
  let episodecode = document.createElement("h2");
  episodecode.className = "cardtitlecode";
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

//select episode
function optionsForEpisode(episode) {
  let select = document.getElementById("dropMenu");
  let option = document.createElement("option");
  option.value = episode.name;
  option.innerText = episode.name;
  select.appendChild(option);
}
function createDropDownList(episodes) {
  let refresh = document.getElementById("dropMenu");
  refresh.replaceChildren([]);
  let createoption = document.createElement("option");
  createoption.value = "non-option";
  createoption.innerText = "all episodes";
  refresh.appendChild(createoption);

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
//create showpage
function makeshowpage(showList) {
  //rootElem.replaceChildren([]);

  showList.forEach(showcard);
  //console.log(hell0);
}

function showcard(show) {
  const sohwpage = document.getElementById("showpage");
  let cardshow = document.createElement("div");

  sohwpage.appendChild(cardshow);
  let showName = document.createElement("h2");
  showName.value = show.name;
  showName.innerText = show.name;
  cardshow.appendChild(showName);
}

function sessionSelcter(showssession) {
  let shows = document.getElementById("allshows");
  let options = document.createElement("option");
  options.value = showssession.name;
  options.innerText = showssession.name;
  shows.appendChild(options);
}
function createDropForSession(allshows) {
  allshows.forEach(sessionSelcter);
  addEvent(allshows);
}
let AllShows = getAllShows();
createDropForSession(AllShows);

function addEvent(shows) {
  let selectId = document.getElementById("allshows");
  selectId.addEventListener("change", function () {
    let optionElement = document.querySelectorAll("option");
    let names = [];
    optionElement.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selectId.value === name);
    let oneSelectedshow = shows.filter((show) => show.name == selectedName);
    let showid = oneSelectedshow[0].id;
    async function catchShows(id) {
      console.log("hello");
      fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
        .then((response) => response.json())
        .then((episodeList) => {
          makePageForEpisodes(episodeList);
          createDropDownList(episodeList);
        });
    }
    catchShows(showid);
  });
}

window.onload = setup;
