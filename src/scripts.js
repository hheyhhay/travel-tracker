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
import './images/turing-logo.png'

export let destinationData; // may not need to  be global
export let tripData; // may not need to  be global
export let travelerData; // may not need to  be global
export let currentTraveler;
export let trips;
export let destinations;
export let userTrips;
export let userDestinations;
console.log('This is the JavaScript entry file - your code begins here.');
// window.addEventListerner('load', invokeFetch)
// const fetchData = () => {
//   addData(trip)
// }
const invokeFetch = () => {
  // Promise.all([destinationData, tripData, travelerData])
  allData
    .then(response => parseValues(response))
    .catch(err => console.log(err))


  // console.log(allData)
  // allData.then(data => console.log(data))
  // .catch(err => console.log(err))
}

const parseValues = (data) => {
  destinationData = data[0].destinations;
  tripData = data[1].trips;
  travelerData = data[2].travelers;
  console.log('destinationData', destinationData)
  console.log('tripData', tripData)
  console.log('travelerData', travelerData)

  instantiation()
  renderPage()
}

const instantiation = () => {
  let i = Math.floor(Math.random() * 50);
  let traveler = new Traveler(travelerData)
  currentTraveler = traveler.findUser(i);
  trips = new Trip(tripData);
  destinations = new Destination(destinationData)
  console.log(i)
  console.log(currentTraveler)
  console.log(trips.findTrips(i))
  console.log(trips.userTrips)
  console.log(trips.currentTrip)
  console.log(destinationData)
  userTrips = trips.findTrips(i)
  userDestinations = destinations.findByTrips(userTrips)
}

invokeFetch()



//ALL DOM MANIPULATION DOWN HERE FOR CHANGING
//Query Selectoctor

const greeting = document.getElementById("greeting");
const cardContainer = document.getElementById("card-container")

const renderPage = () => {
  renderUser()
  renderCards()
}

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
  console.log(cardContainerHTML)
  cardContainer.innerHTML = cardContainerHTML;
}









//
