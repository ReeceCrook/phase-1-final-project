const form = document.querySelector('form')
const darkMode = document.querySelector('#darkMode')
const favContainer = document.querySelector(".favContainer")
const searchDropdown = document.querySelector('#searchDropdown')
const resultContainer = document.querySelector('.resultContainer')

darkMode.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode")
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const search = document.querySelector("#search")
  resultContainer.querySelectorAll('.picResult').forEach(e => e.remove())
  resultContainer.querySelectorAll('.noPicResult').forEach(e => e.remove())
  if (searchDropdown.value === searchDropdown[0].value) {
    fetch(`https://api.tvmaze.com/search/shows?q=${search.value}`)
      .then(function (response) {
        return response.json()
      })
      .then(res => res.forEach(data => renderSearch(data)))
  } else {
    fetch(`https://api.tvmaze.com/search/people?q=${search.value}`)
      .then(function (response) {
        return response.json()
      })
      .then(res => res.forEach(data => renderSearch(data)))
  }
})

searchDropdown.addEventListener('change', () => {
  const p = document.querySelector('.dropText')
  const searchText = document.querySelector('#search')
  if (searchDropdown.value === searchDropdown[0].value) {
    p.textContent = 'Your search will return Shows/Movies'
    searchText.placeholder = "Your Show/Movie here"
  } else {
    p.textContent = 'Your search will return Actors/Actresses'
    searchText.placeholder = "Your Actor/Actresses here"
  }
})

function dropDownHandler(event, name){
  const tabcontent = document.getElementsByClassName('tabcontent')
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }

  const tablinks = document.getElementsByClassName('tablinks')
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace('active', '')
  }

  document.getElementById(name).style.display = 'block'
  event.currentTarget.className += ' active'
}

function renderSearch(data){
  const ul = document.createElement('ul')
  if (searchDropdown.value === searchDropdown[0].value) {
    if (data.show.image === null) {
      ul.className = 'noPicResult'
      ul.id = 'result'
      ul.innerHTML = `
      <div>
        <button class="favButton" onclick="favButtonHandler.call(this)">Favorite</button>
      </div>
      <div class="content">
        <a href="${data.show.url}">"${data.show.name}"</a>
        <p>
          Genres: ${data.show.genres}<br>Language: ${data.show.language}
        </p>
      </div>
      `
      resultContainer.appendChild(ul)
    } else {
      ul.className = 'picResult'
      ul.id = 'result'
      ul.innerHTML = `
      <div>
        <button class="favButton" onclick="favButtonHandler.call(this)">Favorite</button>
      </div>
      <img src="${data.show.image.medium}">
      <div class="content">
        <a href="${data.show.url}">"${data.show.name}"</a>
        <p>
          Genres: ${data.show.genres}<br>Language: ${data.show.language}
        </p>
      </div>
      `
      resultContainer.appendChild(ul)
    }
  } else {
    if (data.person.image === null) {
      ul.className = 'noPicResult'
      ul.id = 'result'
      ul.innerHTML = `
      <div>
        <button class="favButton" onclick="favButtonHandler.call(this)">Favorite</button>
      </div>
      <div class="content">
        <a href="${data.person.url}">"${data.person.name}"</a>
      </div>
      `
      resultContainer.appendChild(ul)
    } else {
      ul.className = 'picResult'
      ul.id = 'result'
      ul.innerHTML = `
      <div>
        <button class="favButton" onclick="favButtonHandler.call(this)">Favorite</button>
      </div>
      <img src="${data.person.image.medium}">
      <div class="content">
        <a href="${data.person.url}">"${data.person.name}"</a>
        <p>
          Country: ${data.person.country.name} <br> Birthday: ${data.person.birthday}
        </p>
      </div>
      `
      resultContainer.appendChild(ul)
    }
  }
}

function favButtonHandler(){
  const result = resultContainer.querySelectorAll('#result')
  const favResults = favContainer.querySelectorAll('#result')
  if(this.textContent === 'Favorite'){
    for(let i = 0; i < result.length; i++){
      if(result[i].querySelector('.favButton') === this){
        this.textContent = "Unfavorite"
        favContainer.appendChild(result[i])
      }
    }
  }else{
    for(let i = 0; i < favResults.length; i++){
      if(favResults[i].querySelector('.favButton') === this){
        this.textContent = "Favorite"
        resultContainer.appendChild(favResults[i])
      }
    }
  }
}

