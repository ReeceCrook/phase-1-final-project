const form = document.querySelector('form')
const colorToggle = document.querySelector('#colorToggle')
const favContainer = document.querySelector(".favContainer")
const searchDropdown = document.querySelector('#searchDropdown')
const resultContainer = document.querySelector('.resultContainer')

colorToggle.addEventListener("click", function(){
  let element = document.body
  element.classList.toggle("dark-mode")
})

function dropDownHandler(event, name){
  let tabcontent = document.getElementsByClassName('tabcontent')
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }

  let tablinks = document.getElementsByClassName('tablinks')
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
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
          Country: ${data.person.country.name}<br>Birthday: ${data.person.birthday}
        </p>
      </div>
      `
      resultContainer.appendChild(ul)
    }
  }
}

form.addEventListener('submit', function(e){
  e.preventDefault()
  resultContainer.querySelectorAll('.picResult').forEach(e => e.remove())
  resultContainer.querySelectorAll('.noPicResult').forEach(e => e.remove())
  const search = document.querySelector("#search")
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

searchDropdown.addEventListener('change', function(){
  const p = document.querySelector('.dropText')

  if (searchDropdown.value === searchDropdown[0].value) {
    p.innerHTML = 'Your search will return Shows/Movies based off of what you search'
  } else {
    p.innerHTML = 'Your search will return Actors/Actresses based off of what you search'
  }
})

function favButtonHandler(){
  const result = resultContainer.querySelectorAll('#result')
  const favResults = favContainer.querySelectorAll('#result')
  if(this.textContent === 'Favorite'){
    for(let i = 0; i < result.length; i++){
      if(result[i].querySelector('.favButton') === this){
        this.textContent = "Unfavorite"
        favContainer.appendChild(result[i])
        return
      }
    }
  }else{
    for(let i = 0; i < favResults.length; i++){
      if(favResults[i].querySelector('.favButton') === this){
        this.textContent = "Favorite"
        resultContainer.appendChild(favResults[i])
        return
      }
    }
  }

}

