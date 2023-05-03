

function onModalClick() {
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
}

function searchTrailer(string) {
  console.log(string);
  const apiKey = 'AIzaSyDm7-bZXIh7FUy4vRVnu1_vDTEck_Cwsa0';
  const query = string + ' official trailer';
  const searchUrl = 'https://www.googleapis.com/youtube/v3/search?' +
    'part=snippet' +
    '&q=' + encodeURIComponent(query) +
    '&type=video' +
    '&videoEmbeddable=true' +
    '&key=' + apiKey;
  fetch(searchUrl)
    .then(onResponse)
    .then(onJson_Trailer);
}


function onJson_Trailer (json){
  const videoId = json.items[0].id.videoId;
  const videoPlayer = document.createElement('iframe');
  videoPlayer.setAttribute('src', `https://www.youtube.com/embed/` + videoId);
  modalView.appendChild(videoPlayer);
  modalView.classList.remove('hidden');
  console.log(videoId);
  console.log(json);
}

function onJson_Title(json) {
  console.log('JSON ricevuto');
  console.log(json);
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const genres = document.createElement('em');  
  const img = document.createElement('img');  
  const regista = document.createElement('div');
  const trailerButton = document.createElement('button');
  title.textContent = json.title + ' ' + '(' + json.year + ')';
  genres.textContent = json.genres + '           ' + 'VOTO:' + json.imDbRating;
  img.src = json.image;
  plot.textContent = json.plot;
  regista.textContent = 'Diretto da: ' + json.directors;
  trailerButton.textContent = 'Clicca per visualizzare il trailer';
  albumView.appendChild(trailerButton);
  albumView.appendChild(container);
  container.appendChild(title);
  container.appendChild(genres);
  container.appendChild(img);
  container.appendChild(regista);
  for (let i=0; i<8; i++) {
    const nome = document.createElement('p');
    const character = document.createElement('em');
    const foto = document.createElement('img');
    const attore = document.createElement('div');
    nome.textContent = json.actorList[i].name;
    character.textContent = json.actorList[i].asCharacter;
    foto.src = json.actorList[i].image;
    cast.appendChild(attore);
    attore.appendChild(nome);
    attore.appendChild(character);
    attore.appendChild(foto);
    attore.classList.add ('attore');
  }
  trailerButton.addEventListener('click', function () { searchTrailer (json.title);})
}

function onTitleClick(event) {
  clickedTitle = event.currentTarget.textContent;
  albumView.innerHTML='';
  let id;
  for (let i = 0; i < jsonResults.length; i++) {
    if (jsonResults[i].title === clickedTitle) {
      id = jsonResults[i].id;
      break; 
    }
  }
  const urlTitle = 'https://imdb-api.com/it/API/Title/' + api_key + '/' + id;
  fetch (urlTitle).then(onResponse).then(onJson_Title);
}

function onResponse(response) {
  return response.json();
}

function onJson(json) {
  console.log('JSON ricevuto');
  console.log(json);
  jsonResults = json.results;
  const istruzioni = document.createElement('div');
  istruzioni.textContent = 'Clicca sul titolo del film interessato';
  albumView.appendChild(istruzioni);
  const list = document.createElement('ol');
  for (let i = 0; i < jsonResults.length; i++) {
    const title = jsonResults[i].title;
    const listItem = document.createElement('li');
    listItem.textContent = title;
    list.appendChild(listItem);
    listItem.addEventListener ('click', onTitleClick);
  }
  istruzioni.appendChild(list);
}

function search(event) {
  plot.innerHTML = '';
  albumView.innerHTML = '';
  cast.innerHTML = '';
  event.preventDefault();
  const content = document.querySelector('#content').value;
  const text = encodeURIComponent(content);
  const url = 'https://imdb-api.com/it/API/SearchAll/' + api_key + '/' + text;
  fetch(url).then(onResponse).then(onJson);
}

let token;
let jsonResults;
const api_key = 'k_78t0fkr2';
const plot = document.querySelector('#plot');
const albumView = document.querySelector('#album-view');
const cast = document.querySelector('#cast');
const form = document.querySelector('#search_content');
form.addEventListener('submit', search);

const modalView = document.querySelector('#modale');
modalView.addEventListener('click', onModalClick);



