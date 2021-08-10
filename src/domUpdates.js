var dayjs = require('dayjs');

import {
  invokeFetch,
  currentTraveler,
  userTrips,
  destinations,
  trips,
  destinationData,
  tripData,
  newTrip
} from './scripts'

import Trip from './Trip';

import {
  postTrip
} from './apiCalls';

export const renderPage = () => {
  console.log('connected to Dom')
  renderUser()
  renderCards(userTrips)
  renderDropdown()
}


const greeting = document.getElementById("greeting");
const cardContainer = document.getElementById("card-container")
const totalCost = document.getElementById("total-amount")
const newTripForm = document.getElementById("book-trip")
const bookAnotherTripBtn = document.getElementById("book-another-trip")
const formCard = document.getElementById("form-page")
export const formContainer = document.getElementById("form-container")
const mainPage = document.getElementById("main-page")
export const submitTrip = document.getElementById("book-trip")
export const calenderDate = document.getElementById("date")
export const tripDuration = document.getElementById("duration")
export const tripTravelers = document.getElementById("travelers")
export const dropdown = document.getElementById("dropdown")
export const backPage = document.getElementById("form-back")
export const bookBtn = document.getElementById("book-btn")


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
          <a>Your ${trips.findTenseOfTrip(trip)} trip to  ${destinations.findById(trip.destinationID).destination}</a>
          <ul>
            <li>on ${dayjs(trip.date).format("MM/DD/YYYY")} </li>
            <li>for ${trip.travelers} travelers </li>
          </ul>
        </div>
      </section>`
  })

  cardContainer.innerHTML = cardContainerHTML;
}



const totalSpent = () => { // doublec check this math!
  /// NEED TO HAVE IT UPDATE WITH NEW CARD BOOKED.. maybe?

  trips.findTrips(currentTraveler.id)
  let yearTrips = trips.findTripsInYear()

  if (!destinations.findTotalSpent(yearTrips)) {
    totalCost.innerHTML = `You need to travel more! $0 spent in ${dayjs(trips.today).year()}`
  } else {
    totalCost.innerHTML = `Beautiful! You've spent $${destinations.findTotalSpent(yearTrips)} on trips in ${dayjs(trips.today).year()}`

  }
  event.reset() // says it doesn't work but it does allow it tor reset... need to explore thsi bug
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
  console.log(trip)
  console.log(destinations.findTotalSpent([trip]))

  let cardBackHTML = `<img class="image" src="${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
  <h2>${destinations.findById(trip.destinationID).destination}</h2>
  <h2>costs: $55005.00</h2>
  <div class="buttons">
    <button type="button" class="button" id = "book-btn" name="book-it">Book it!</button>
    <button type="button" class="button" name="no-thanks">No thanks</button>
  </div>`

  backPage.innerHTML = cardBackHTML;

  formCard.classList.add("hidden")
  backPage.classList.remove("hidden")
  console.log('bookbtn inDOM', bookBtn)
}

const showForm = (event) => {
  formContainer.classList.remove("hidden")
  formCard.classList.remove("hidden");
  mainPage.classList.add("hidden")
}

export const showCards = () => {
  formContainer.classList.add("hidden");
  backPage.classList.add("hidden");
  mainPage.classList.remove("hidden")
}


bookAnotherTripBtn.addEventListener('click', showForm)
totalCost.addEventListener('click', totalSpent)
