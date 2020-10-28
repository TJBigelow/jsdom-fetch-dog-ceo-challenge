console.log('%c HI', 'color: firebrick')

const breedList = document.getElementById("dog-breeds")
const filterDropdown = document.getElementById('breed-dropdown')
let dogBreeds = []

function fetchImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4') 
    .then(response => response.json()) 
    .then(json => renderImages(json.message))
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all') 
    .then(response => response.json()) 
    .then(json => initializeBreeds(json.message))
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

function filterBreeds(letter){
    dogBreeds.filter(breed => breed.startsWith(letter)).forEach(breed => {
        const liTag = document.createElement('li')
        liTag.innerHTML = breed
        liTag.addEventListener('click', function(e){
            e.target.style = `color: rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255});`
        })
        breedList.appendChild(liTag)
    })
}

function initializeBreeds(breeds){
    Object.keys(breeds).forEach(breed => {
        if(breeds[breed].length > 0){
            breeds[breed].forEach(subBreed => {
                dogBreeds.push(`${subBreed} ${breed}`)
            })
        } else {
            dogBreeds.push(breed)
        }
    })
    filterBreeds('a')
}

filterDropdown.addEventListener('change', function(e){
    breedList.innerHTML = ''
    filterLetter = e.target.value
    filterBreeds(filterLetter)
})

fetchImages()
fetchBreeds()