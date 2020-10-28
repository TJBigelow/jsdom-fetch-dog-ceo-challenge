console.log('%c HI', 'color: firebrick')

let dogBreeds = []
const breedList = document.getElementById("dog-breeds")
const filterDropdown = document.getElementById('breed-dropdown')

function fetchImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4') 
    .then(response => response.json()) 
    .then(json => renderImages(json.message))
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all') 
    .then(response => response.json()) 
    .then(json => renderBreeds(json.message))
}

function renderImages(images) {
    const imageContainer = document.getElementById("dog-image-container")
    images.forEach(function(imageURL){
        let imgTag = document.createElement('img')
        imgTag.setAttribute('src', imageURL)
        imgTag.setAttribute('style', "width: 200px; padding: 5px;")
        imageContainer.appendChild(imgTag)
    })
}

function renderFilteredBreed(letter){
    dogBreeds.filter(breed => breed.startsWith(letter)).forEach(function(breed){
        const liTag = document.createElement('li')
        liTag.innerHTML = breed
        liTag.addEventListener('click', function(e){
            e.target.style = `color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});`
        })
        breedList.appendChild(liTag)
    })
}

function renderBreeds(breeds){
    dogBreeds = Object.keys(breeds)
    renderFilteredBreed('a')
}

filterDropdown.addEventListener('change', function(e){
    breedList.innerHTML = ''
    filterLetter = e.target.value
    renderFilteredBreed(filterLetter)
})

fetchImages()
fetchBreeds()