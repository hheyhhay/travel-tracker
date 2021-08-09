var dayjs = require('dayjs');

import {currentTraveler, userTrips, destinations, trips, destinationData} from './scripts'

export const renderPage = () => {
  console.log('connected to Dom')
  renderUser()
  renderCards()
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
const submitTrip = document.getElementById("book-trip")
const calenderDate = document.getElementById("date")
const tripDuration = document.getElementById("duration")
const tripTravelers = document.getElementById("travelers")
const dropdown = document.getElementById("dropdown")


//event Listeners


const renderUser = () => {
  let greetingHTML = `Hello, ${currentTraveler.name}`
  greeting.innerHTML = greetingHTML;
}

const renderCards = () => {

  let cardContainerHTML = userTrips.map(trip => {

    return `<section class="trip-info" >
        <img class = "image" src = "${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
        <div class="text-info">
          <span class="status"> ${trip.status}</span>
          <a>Location: ${destinations.findById(trip.destinationID).destination}</a>
          <li>date: ${trip.date} </li>
          <li>Travelers: ${trip.travelers}</li>
        </div>
      </section>`


  })

  cardContainer.innerHTML = cardContainerHTML;
}

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
    <select class="destination" id = "drop-down" name="destination" >
    <option value = "${destination.destination}" > ${destination.destination}</option> </select>`
  })
  dropdown.innerHTML = dropdownHTML;
}


// const showForm = () => {
//   console.log('clicked')
//
//   formCard.classList.remove("hidden");
//   mainPage.classList.add("hidden")
//
// }

const bookTrip = (event) => {
  event.preventDefault();
  console.log(calenderDate.value)
  console.log(tripDuration.value)
  console.log(tripTravelers.value)
  console.log(dropdown.value)
  console.log(destinations.findId("San Francisco, California"))

  const newTrip = {
    id: destinationData.length++,
    userID:currentTraveler.id,
    destinationID: destinations.findId(dropdown.value),
    travelers: tripTravelers.value,
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: tripDuration.value,
    status: 'pending',
    suggestedActivities: []
  }
console.log(newTrip)
}


// bookAnotherTripBtn.addEventListener('click', showForm)
submitTrip.addEventListener('submit', () => bookTrip(event))
