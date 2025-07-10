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
                console.log('Non ci sono immagini')
                cardContainer.innerHTML += `
                 <div class="col justify-content-center">
                     <div class="alert alert-danger mx-auto w-75" role="alert"> Non ci sono immagini!</div>
                 </div>
                    `
            } else { //Se ci sono immagini mostro le card
                arrayImg.photos.forEach((event) => {

                    let imgTitle; //Alcune immagini non hanno un titolo quindi creo una variabile per gestire questo problema

                    if (event.alt) {
                        imgTitle = event.alt; // Assegna il valore
                    } else {
                        imgTitle = 'Nessun Titolo Trovato'; // Assegna il valore predefinito
                    }

                    cardContainer.innerHTML += `
                    <div class="col" id="card-${event.id}">
                    <div class="card h-100">
                        <img src="${event.src.original}" class="card-img-top object-fit-cover" style="height: 200px; alt="img-${event.id}" data-bs-toggle="modal" data-bs-target="#exampleModal-${event.id}">
                        <div class="card-body">
                            <h5 class="card-title" data-bs-toggle="modal" data-bs-target="#exampleModal-${event.id}">${imgTitle}</h5>
                            
                        </div>
                        <div class="text-center">
                        <button class="btn btn-danger my-2" onclick="hideCard('card-${event.id}')">
                                <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                              Hide
                            </button>
                        </div>
                    </div>
                </div>

                         <!-- Modal -->
                            <div class="modal fade" id="exampleModal-${event.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">${imgTitle}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" style="background-color: ${event.avg_color};">
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