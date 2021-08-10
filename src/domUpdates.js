var dayjs = require('dayjs');

import {invokeFetch, currentTraveler, userTrips, destinations, trips, destinationData, tripData, newTrip} from './scripts'

import Trip from './Trip';

import {postTrip} from './apiCalls';

export const renderPage = () => {
  console.log('connected to Dom')
  renderUser()
  renderCards(userTrips)
  renderTotalSpent()
  renderDropdown()
}


const greeting = document.getElementById("greeting");
const cardContainer = document.getElementById("card-container")
const totalCost = document.getElementById("total-amount")
const newTripForm = document.getElementById("book-trip")
const bookAnotherTripBtn = document.getElementById("book-another-trip")
const formCard = document.getElementById("form-page")
const mainPage = document.getElementById("main-page")
export const submitTrip = document.getElementById("book-trip")
export const calenderDate = document.getElementById("date")
export const tripDuration = document.getElementById("duration")
export const tripTravelers = document.getElementById("travelers")
export const dropdown = document.getElementById("dropdown")
const backPage = document.getElementById("form-back")
export const bookBtn = document.getElementById("book-btn")



//event Listeners
// window.addEventListener('load', invokeFetch) // should this be here or in dom


const renderUser = () => {
  let greetingHTML = `Hello, ${currentTraveler.name}`
  greeting.innerHTML = greetingHTML;
}

export const renderCards = (userTripsArray) => {

  let cardContainerHTML = userTripsArray.map(trip => {

    return `<section class="trip-info" >
        <img class = "image" src = "${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
        <div class="text-info">
          <span class="status"> ${trip.status}</span>
          <a>Your upcoming trip to  ${destinations.findById(trip.destinationID).destination}</a>
          <li>on ${dayjs(trip.date).format("DD/MM/YYYY")} </li>
          <li>Travelers: ${trip.travelers}</li>
        </div>
      </section>`
  })

  cardContainer.innerHTML = cardContainerHTML;
}

const findTenseOfTrip = (trip)

const renderTotalSpent = () => {
  trips.findTrips(19)
  trips.findTripsInYear()
  trips.findTrips(currentTraveler.id)
  let yearTrips = trips.findTripsInYear()
}


const renderDropdown = () => {

  let dropdownHTML = "";
  destinationData.forEach(destination => {
    dropdownHTML += `
    <label for = "destinations" >Choose a destination:</label>
    <select class= "destinations input" id = "drop-down" name="destination" >
    <option value = "${destination.destination}" class = "input"> ${destination.destination}</option> </select>`
  })
  dropdown.innerHTML = dropdownHTML;
}

export const renderCardBack = (trip) => {
  console.log('?')

  let cardBackHTML = `<img class="image" src="${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
  <h2>${destinations.findById(trip.destinationID).destination}</h2>
  <h2>costs: $55005.00</h2>
  <div class="buttons">
    <button type="button" class="button" id = "book-btn" name="book-it">Book it!</button>
    <button type="button" class="button" name="no-thanks">No thanks</button>
  </div>`

  backPage.innerHTML = cardBackHTML;
  console.log('bookbtn inDOM', bookBtn)
}
// const showForm = () => {
//   console.log('clicked')
//
//   formCard.classList.remove("hidden");
//   mainPage.classList.add("hidden")
//
// }



// is POST a domUPdate? or a scripts file!
// bookAnotherTripBtn.addEventListener('click', showForm)
