document.addEventListener('DOMContentLoaded', () => {
  let catId
  loginForm = document.querySelector('#login-form')
  logincatselect = document.querySelector('#login-cats')
  mainContent = document.querySelector('main')
  welcomeMessage = document.querySelector('#welcome-message')
  locationContainer = document.querySelector('#location-container')
  singleLocationContainer = document.querySelector('#single-location-container')

  console.log("YAY! Everything loaded!")
  // !This is out first GET request to the server to get all the cats avaliable to login as
  fetch('http://localhost:3000/cats')
    .then(resp => resp.json())
    .then(loginCat)

  // !This gets the array of cat objects from the fetch request and adds them as options to the select HTML menu
  function loginCat(arrofCats) {
    arrofCats.forEach((cat) => {
      logincatselect.innerHTML += `<option value="${cat.id}" data-cat-name=${cat.name}>${cat.name}</option>`
    })
  }

  // !This makes a fetch request to the server to get all the locations....
  function getAllLocations() {
      fetch('http://localhost:3000/locations').then(resp => resp.json()).then(locations => {
          locations.forEach((location) => {
              // !addes the HTML to the location container for each location
              // !also filters calls the createButtonElement function to create the buttons
              locationContainer.innerHTML += `
                  <div data-id=${location.id}>
                      <div class="location-picture">
                          <img src=${location.picture}/>
                      </div>
                      <p>${location.description}</p>
                      <div class="reactions">
                          ${createButtonElement("😼", location.reactions)}
                          ${createButtonElement("😻", location.reactions)}
                          ${createButtonElement("💩", location.reactions)}
                          ${createButtonElement("🙀", location.reactions)}
                      </div>
                  </div>
              `
          })
      })
    }


  //BUTTON TO REVEAL NEW LOCATION FORM
  const newLocationButton = document.createElement("button")
  const newLocationButtonDiv = document.createElement("div")
  newLocationButtonDiv.classList.add("new-location-div")

  newLocationButton.innerText = "add dat new spot"
  newLocationButton.classList.add("new-btn")
  newLocationButtonDiv.appendChild(newLocationButton)

  locationContainer.appendChild(newLocationButtonDiv)

  //NEW LOCATION FORM
  const newLocationForm = document.createElement("form")
  const newLocationLabel = document.createElement("label")
  newLocationLabel.innerText = "Add the details for your new location's below:"
  newLocationForm.id = "new-location-form"
  newLocationForm.hidden = true

  const newLocationPicture = document.createElement("input")
  newLocationPicture.placeholder = "picture link..."
  const newLocationDescription = document.createElement("input")
  newLocationDescription.placeholder = "description..."
  const createLocationButton = document.createElement("button")
  createLocationButton.innerText = "Add Location"
  createLocationButton.id = "add-location-btn"

  newLocationForm.appendChild(newLocationLabel)
  newLocationForm.appendChild(newLocationPicture)
  newLocationForm.appendChild(newLocationDescription)
  newLocationForm.appendChild(createLocationButton)

  newLocationButtonDiv.appendChild(newLocationForm)

  locationContainer.addEventListener("click", (e) => {
    // DELEGATION TO NEW LOCATION BUTTON
    if (e.target.classList.contains("new-btn")) {
      // change class on new location form to show
      const newLocationForm = e.target.parentNode.childNodes[1]
      const newLocationButton = e.target.parentNode.childNodes[0]
      newLocationForm.hidden = false
      newLocationForm.style.display = "flex"
      newLocationButton.hidden = true
    }
    // DELEGATION TO ADD LOCATION BUTTON
    if (e.target.id === "add-location-btn") {
      e.preventDefault()
      // console.log(e.target.parentNode.childNodes)
      const pictureSrcValue = e.target.parentNode.childNodes[1].value
      const descriptionValue = e.target.parentNode.childNodes[2].value
      e.target.parentNode.reset()
      console.log(pictureSrcValue);
      console.log(descriptionValue);


      // ADDING NEW LOCATION TO BACKEND
      config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "description": descriptionValue,
          "picture": pictureSrcValue,
          "cat_id": catId,
        })
      }

      fetch("http://localhost:3000/locations", config)
      .then(resp => resp.json())
      // .then(console.log)
      .then((newLocation) => {
        console.log(newLocation)
        // ADDING NEW LOCATION TO DOM
        locationContainer.innerHTML +=
        `
          <div data-id=${newLocation.id}>
            <img src=${pictureSrcValue}/>
            <p>${descriptionValue}</p>
            <div class="reactions">
            ${createButtonElement("😼", newLocation.reactions)}
            ${createButtonElement("😻", newLocation.reactions)}
            ${createButtonElement("💩", newLocation.reactions)}
            ${createButtonElement("🙀", newLocation.reactions)}
            </div>
          </div>
        `
      })
    }
  })


  // !This handles creating a button element with the correct data
  function createButtonElement(catEmj, reactions) {
    // !This is setting up the filter for ALL the reactions on a location
    let allEmojiReactions = reactions.filter((reaction) => {
      return reaction.emoji == catEmj
    })
    let allEmojiReactionsCount = allEmojiReactions.length

    // !This is seeting up reactions that pertain to the CURRENT cat
    let results = reactions.filter((reaction) => {
      return reaction.cat_id === parseInt(catId) && reaction.emoji === catEmj
    })

    // !Returns the corresponding data for each button
    return `
        <button
        class="${results.length > 0 ? `done reaction-button` : `reaction-button`}"
        ${results.length > 0 ? `data-reaction-id=${results[0].id}` : ` `}>

            ${catEmj}<span data-count=${allEmojiReactionsCount}>${allEmojiReactionsCount}</span>

        </button>`
  }

  function deleteReaction(reactionId) {
    const config = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/reactions/${reactionId}`, config)
  }
  
  function updatingLocationForm(e){
    e.preventDefault()

    locationBeingUpdated = parseInt(e.target.dataset.locationId)
    updatedDescription = e.target.description.value
    config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "description": updatedDescription
        })
    }

    fetch(`http://localhost:3000/locations/${locationBeingUpdated}`,config).then(resp => resp.json()).then(location => {
        singleLocationContainer.querySelector('#edit-location-form').style.display = "none"

        let overlayDescription = singleLocationContainer.querySelector('#description')
        overlayDescription.style.display = "block"
        overlayDescription.innerText = location.description
        singleLocationContainer.querySelector('.edit-location-button').style.display = "inline-block"
        let mainDiv = locationContainer.querySelector(`div[data-id = "${location.id}"] p`)
        mainDiv.innerText = location.description
    })
}

  // !This handles the submit for the initial login form
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const catName = e.target.cat.selectedOptions[0].innerText
    catId = e.target.cat.value
    loginForm.style.display = "none"
    mainContent.style.display = "block"
    welcomeMessage.innerText = `Hello Fellow Feline Friend ${catName}! 😼`

    // !Calls the function to get all the locations
    getAllLocations()
  })

  // ?Delegation only recognized on <button> not <span> within <button>
  // !This adds an event listener on the locations container
  locationContainer.addEventListener("click", (e) => {
    // !If the targeted element (button) is a reaction-button...
    if (e.target.classList.contains("reaction-button")) {
      const reactionSpan = e.target.childNodes[1]
      let spanDataSetCount = reactionSpan.dataset.count
      let reactionCount = parseInt(spanDataSetCount)
      //! but! if it also has a DONE class
      if (e.target.classList.contains("done")) {
        const reactionId = parseInt(e.target.dataset.reactionId)
        e.target.removeAttribute("data-reaction-id")
        e.target.classList.remove("done")
        reactionCount -= 1
        reactionSpan.dataset.count = reactionCount
        reactionSpan.innerText = reactionCount
        //! We delete the reaction
        deleteReaction(reactionId)
        return
      }
      //debugger
      // !Else, we make a post request and create a new reaction
      reactionCount += 1
      reactionSpan.dataset.count = reactionCount
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

      fetch('http://localhost:3000/reactions', config)
        .then(resp => resp.json())
        .then(data => {
          e.target.dataset.reactionId = data.id
        })
    }

        // !If the targeted element is the image tag...
        else if (e.target.tagName == "IMG") {
            //debugger
            const singleLocationId = e.target.parentElement.parentElement.dataset.id
            fetch(`http://localhost:3000/locations/${singleLocationId}`).then(resp => resp.json()).then(location => {
                singleLocationContainer.style.transform = "translateY(0)"
                singleLocationContainer.innerHTML = `
                <div class="single-location">
                    <div class="location-photo"><img src="${location.picture}"/></div>
                    <div class="location-description">
                        <p id="description">${location.description}</p>
                    </div>
                    <div class="location-reactions">
                        ${createButtonElement("😼", location.reactions)}
                        ${createButtonElement("😻", location.reactions)}
                        ${createButtonElement("💩", location.reactions)}
                        ${createButtonElement("🙀", location.reactions)}
                    </div>
                </div>`

                if ( location.cat_id === parseInt(catId) ){
                    singleLocationContainer.querySelector('.location-description').innerHTML += `
                        <form id="edit-location-form" data-location-id="${location.id}">
                            <label>Add Your Changes</label>
                            <input name="description" type="text" value="${location.description}"/> 
                            <button>Update Description</button>
                        </form>
                        <button class="edit-location-button">Edit</buton>`
                    //! This adds an event listener on the form AFTER it is being added to the DOM
                    singleLocationContainer.querySelector('#edit-location-form').addEventListener('submit', (e) => updatingLocationForm(e))
                }

                singleLocationContainer.addEventListener("click", (e) => {
                    if (e.target.id === "single-location-container") {
                        singleLocationContainer.style.transform = "translateY(-100%)"
                        singleLocationContainer.innerHTML = ``
                    }
                    else if(e.target.classList.contains('edit-location-button')){
                        e.preventDefault()
                        let editLocationForm = singleLocationContainer.querySelector('#edit-location-form')
                        let decriptionParagraph = singleLocationContainer.querySelector('#description')
                        console.log("Edit button is being clicked!")
                        e.target.style.display = "none"
                        decriptionParagraph.style.display = "none"
                        editLocationForm.style.display = "flex"
                    }
                })
            })
        }
    })
})
