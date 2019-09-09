document.addEventListener('DOMContentLoaded', () => {
    let catId
    loginForm = document.querySelector('#login-form')
    logincatselect = document.querySelector('#login-cats')
    mainContent = document.querySelector('main')
    welcomeMessage = document.querySelector('#welcome-message')
    locationContainer = document.querySelector('#location-container')
    console.log("YAY! Everything loaded!")
    fetch('http://localhost:3000/cats')
    .then(resp => resp.json())
    .then(loginCat)

    function loginCat(arrofCats) {
        arrofCats.forEach((cat) => {
            logincatselect.innerHTML += `<option value="${cat.id}" data-cat-name=${cat.name}>${cat.name}</option>`
        }
        )
    }
    function getAllLocations() {
        fetch('http://localhost:3000/locations').then(resp => resp.json()).then(locations => {
            locations.forEach((location) => {
                // const locationDiv = document.createElement('div')
                // locationDiv.classList.add = "reactions"
                // location.reactions.forEach((react) => {

                // })
                locationContainer.innerHTML += `
                    <div dataset-id=${location.id}>
                        <img src=${location.picture}/>
                        <p>${location.description}</p>
                        <div class="reactions">
                            <button>😼<span>3</span></button>
                            <button>😻<span>1</span></button>
                            <button>💩<span>0</span></button>
                            <button>🙀<span>0</span></button>
                        </div>
                    </div>
                `
            })
        })
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const catName = e.target.cat.selectedOptions[0].innerText
        catId = e.target.cat.value
        loginForm.style.display = "none"
        mainContent.style.display = "block"
        welcomeMessage.innerText = `Hello Fellow Feline Friend ${catName}! 😼`
        getAllLocations()
    })

})