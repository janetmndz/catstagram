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
                ////console.log("reaction object: ", reactions)

                // SMIRK COUNT FOR EACH LOCATION
                let smirk_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "😼"
                })
                let smirkReactionCount = smirk_reactions.length
                ////console.log("smirks: ", smirkReactionCount)

                // HEART COUNT FOR EACH LOCATION
                let heart_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "😻"
                })
                let heartReactionCount = heart_reactions.length
                /////console.log("hearts: ", heartReactionCount)

                // POOP COUNT FOR EACH LOCATION
                let poop_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "💩"
                })
                let poopReactionCount = poop_reactions.length
                /////console.log("poops: ", poopReactionCount)

                // SCARED COUNT FOR EACH LOCATION
                let scared_reactions = reactions.filter((reaction) => {
                  return reaction.emoji == "🙀"
                })
                let scaredReactionCount = scared_reactions.length
                /////console.log("scared: ", scaredReactionCount)


                locationContainer.innerHTML += `
                    <div data-id=${location.id}>
                        <img src=${location.picture}/>
                        <p>${location.description}</p>
                        <div class="reactions">
                            ${createButtonElement("😼", location.reactions)}
                            ${createButtonElement("😻", location.reactions)}
                            ${createButtonElement("💩", location.reactions)}
                            ${createButtonElement("🙀", location.reactions)}
                        </div>
                    </div>
                `
                //<button class="${reactionExists(location.reactions, "😼")}">😼<span data-count=${smirkReactionCount}>${smirkReactionCount}</span></button>
                // <button class="${reactionExists(location.reactions, "😻")}">😻<span data-count=${heartReactionCount}>${heartReactionCount}</span></button>
                //<button class="${reactionExists(location.reactions, "💩")}">💩<span data-count=${poopReactionCount}>${poopReactionCount}</span></button>
                //<button class="${reactionExists(location.reactions, "🙀")}">🙀<span data-count=${scaredReactionCount}>${scaredReactionCount}</span></button>
            })
        })
    }
    function createButtonElement(catEmj,reactions) {
        // !This is setting up the filter for ALL the reactions on a location
        let allEmojiReactions = reactions.filter((reaction) => {
            return reaction.emoji == catEmj
        })
        let allEmojiReactionsCount = allEmojiReactions.length


        // !This is seeting up reactions that pertain to the CURRENT cat
        let results = reactions.filter((reaction) => { return reaction.cat_id === parseInt(catId) && reaction.emoji === catEmj })

        return ` 
        <button 
        class="${results.length > 0 ? `done reaction-button` : `reaction-button`}" 
        ${results.length > 0 ? `data-reaction-id=${results[0].id}` : ` `}>

            ${catEmj}<span data-count=${allEmojiReactionsCount}>${allEmojiReactionsCount}</span>

        </button>
        `
    }

    function reactionExists(reactions, emj) {
        let results = reactions.filter((reaction) => {return reaction.cat_id === parseInt(catId) && reaction.emoji === emj})
        //console.log(reactions, results.length)
        //console.log(results[0] ? results[0].id : "none")
        return results.length > 0 ? `done reaction-button` : `reaction-button` 
    }

    function deleteReaction(reactionId) {
        console.log(reactionId)
        const config = {
            method: "DELETE"
        }
        fetch(`http://localhost:3000/reactions/${reactionId}`, config).then(resp => resp.json()).then((t) => {
            getAllLocations()
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

    // Delegation only recognized on <button> not <span> within <button>
    locationContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("reaction-button")) {
            const reactionSpan = e.target.childNodes[1]
            let spanDataSetCount = reactionSpan.dataset.count
            let reactionCount = parseInt(spanDataSetCount)

            if (e.target.classList.contains("done")){
                const reactionId = parseInt(e.target.dataset.reactionId)
                e.target.removeAttribute("data-reaction-id")
                e.target.classList.remove("done")
                reactionCount--
                spanDataSetCount = reactionCount
                reactionSpan.innerText = reactionCount
                deleteReaction(reactionId)
                return
            }
            reactionCount++
            spanDataSetCount = reactionCount
            reactionSpan.innerText = reactionCount
            e.target.classList.add("done")
            const locationId = e.target.parentElement.parentElement.dataset.id
            const selectedEmoji = e.target.childNodes[0].textContent.trim()

            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "cat_id": catId,
                    "location_id": parseInt(locationId),
                    "emoji": selectedEmoji
                })
            }
            console.log(config)
            fetch('http://localhost:3000/reactions', config).then(resp => resp.json()).then(data => {
                e.target.dataset.reactionId = data.id
            })
        }
    })

})
