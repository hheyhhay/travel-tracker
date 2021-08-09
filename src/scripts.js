// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

import {
  allData
} from './apiCalls';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)

export let destinationData; // may not need to  be global
export let tripData; // may not need to  be global
export let travelerData; // may not need to  be global
export let currentTraveler;
export let trips;
export let destinations;
export let userTrips;
export let userDestinations;
console.log('This is the JavaScript entry file - your code begins here.');

const invokeFetch = () => {
  allData
    .then(response => parseValues(response))
    .catch(err => console.log(err))

}

const parseValues = (data) => {
  destinationData = data[0].destinations;
  tripData = data[1].trips;
  travelerData = data[2].travelers;

  instantiation()
  renderPage()
}

const instantiation = () => {
  let i = Math.floor(Math.random() * 50);
  let traveler = new Traveler(travelerData)
  currentTraveler = traveler.findUser(i);
  trips = new Trip(tripData);
  destinations = new Destination(destinationData)

  userTrips = trips.findTrips(i)
  userDestinations = destinations.findByTrips(userTrips)
}

invokeFetch()



//ALL DOM MANIPULATION DOWN HERE FOR CHANGING
//Query Selectoctor



const renderPage = () => {
  renderUser()
  renderCards()
  renderTotalSpent()
  renderDropdown()
}
const greeting = document.getElementById("greeting");
const cardContainer = document.getElementById("card-container")
const totalCost = document.getElementById("total-amount")
const dropdown = document.getElementById("dropdown")
const newTripForm = document.getElementById("book-trip")
const bookAnotherTripBtn = document.getElementById("book-another-trip")
const formCard = document.getElementById("form-page")
const mainPage = document.getElementById("main-page")
const submitTrip = document.getElementById("book-trip")

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
  console.log('event.target', event.target.parentNode)

  // event.stopImmediatePropagation();
  const formData = new FormData(event.target);
  console.log('formData', formData)
  console.log('date in form', formData.get('start'))
}

// bookAnotherTripBtn.addEventListener('click', showForm)
submitTrip.addEventListener('submit', () => bookTrip(event))


//
