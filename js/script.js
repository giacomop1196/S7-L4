const apiKey = '5F5tqbYJgVFrygFVXtfxi590X9oSlvlc0McRtpO05mKyGNfkS0LOrtUC'
const apiLink = 'https://api.pexels.com/v1/search?query='
let apiAttribute = 'hamsters'
const cardContainer = document.getElementById('card-container')
const viewButton = document.getElementById('view-button')
const viewButtonTwo = document.getElementById('view-button-2')
const form = document.getElementById('form')
const formInput = document.getElementById('form-input')

//FUNZIONE PER NASCONDERE LE CARD
const hideCard = function (cardIdToHide) {
    const card = document.getElementById(cardIdToHide);
    if (card) {
        card.classList.add('d-none'); // Aggiunge la classe d-none per nascondere la card
        console.log(`Card con ID: ${cardIdToHide} nascosta.`);
    }
};


// FUNZIONE PER MOSTRARE LE IMMAGINI
const getImage = function () {
    fetch(apiLink + apiAttribute, {
        headers: {
            Authorization: apiKey // Key
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error()
            }
        })
        .then((arrayImg) => {
            console.log('Array: ', arrayImg)

            if (arrayImg.photos.length === 0) { //Se non ci sono immagini
                console.log('non ci sono immagini')
                cardContainer.innerHTML += `
                    <div class="col">
                    <div class="d-flex justify-content-center">
                            <h5 class="text-white">Non ci sono immagini</h5>
                    </div>
                </div>
                    `
            } else { //Se ci sono immagini mostro le card
                arrayImg.photos.forEach((event) => {
                    cardContainer.innerHTML += `
                    <div class="col" id="card-${event.id}">
                    <div class="card h-100">
                        <img src="${event.src.original}" class="card-img-top object-fit-cover" style="height: 200px; alt="img-${event.id}">
                        <div class="card-body">
                            <h5 class="card-title">${event.alt}</h5>
                            <button class="btn btn-danger" onclick="hideCard('card-${event.id}')">Hide</button>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-${event.id}">
                              Launch demo modal
                            </button>
                        </div>
                    </div>
                </div>

                         <!-- Modal -->
                            <div class="modal fade" id="exampleModal-${event.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">${event.alt}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="d-flex justify-content-center">
                                                <img src="${event.src.original}" alt="img-${event.id}"
                                                    class="w-50 rounded-3">
                                            </div>
                                            <p class="text-center">Artista: ${event.photographer}</p>
                                        </div>
                                        <div class="modal-footer justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                            <a href="${event.photographer_url}" target="_blank" class="btn btn-primary">Link Profilo</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `
                })
            }
        })
        .catch((err) => {
            console.log('Errore', err)
        })
}

// FUNZIONE PER IL PULSANTE CHE MOSTRA LE IMMAGINI CON I CRICETI
const viewImgList = function () {
    getImage()
    viewButton.classList.add('d-none') //Nasconde il pulsante
    viewButtonTwo.classList.remove('d-none') //Mostra il secondo pulsante
}

// FUNZIONE PER IL PULSANTE CHE MOSTRA LE IMMAGINI CON LE TIGRI
const showMore = function () {
    apiAttribute = 'tigers'
    cardContainer.innerHTML = ''
    getImage()
}

//FUNZIONE PER CERCARE NEL FORM

const searchForm = function (e) {
    e.preventDefault() //Evito di aggiornare la pagina
    const searchInput = formInput.value

    if (searchInput) {
        apiAttribute = searchInput // Aggiorno apiAttribute con il valore dell'input
        cardContainer.innerHTML = ''
        getImage() // Chiamo getImage() per ricaricare le nuove immagini
        formInput.value = ''
    } else {
        console.log('Errore')
    }
}

viewButton.addEventListener('click', viewImgList);
viewButtonTwo.addEventListener('click', showMore);
form.addEventListener('submit', searchForm);