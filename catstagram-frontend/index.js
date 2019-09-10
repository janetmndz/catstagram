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

                const reactions = location.reactions
                console.log("reaction object: ", reactions)

                // SMIRK COUNT FOR EACH LOCATION
                let smirk_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "😼"
                })
                let smirkReactionCount = smirk_reactions.length
                console.log("smirks: ", smirkReactionCount)

                // HEART COUNT FOR EACH LOCATION
                let heart_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "😻"
                })
                let heartReactionCount = heart_reactions.length
                console.log("hearts: ", heartReactionCount)

                // POOP COUNT FOR EACH LOCATION
                let poop_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "💩"
                })
                let poopReactionCount = poop_reactions.length
                console.log("poops: ", poopReactionCount)

                // SCARED COUNT FOR EACH LOCATION
                let scared_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "🙀"
                })
                let scaredReactionCount = scared_reactions.length
                console.log("scared: ", scaredReactionCount)


                locationContainer.innerHTML += `
                    <div dataset-id=${location.id}>
                        <img src=${location.picture}/>
                        <p>${location.description}</p>
                        <div class="reactions">
                            <button>😼<span>${smirkReactionCount}</span></button>
                            <button>😻<span>${heartReactionCount}</span></button>
                            <button>💩<span>${poopReactionCount}</span></button>
                            <button>🙀<span>${scaredReactionCount}</span></button>
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
