// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
var dayjs = require('dayjs');

import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {renderPage, dropdown, tripTravelers, tripDuration, calenderDate, submitTrip, bookBtn, renderCards, renderCardBack} from './domUpdates';
import {
  allData, postTrip
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



export const invokeFetch = () => {
  allData
    .then(response => parseValues(response))
    .catch(err => console.log(err)) // ADD DOM ERROR!

}
//Make sure destinationData.length is updated after the post/get to keep newTrip id working
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


const bookTrip = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

 const newTrip = {
    id: 1 + tripData.length++,
    userID:currentTraveler.id,
    destinationID: destinations.findId(dropdown.value),
    travelers: tripTravelers.value,
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: tripDuration.value,
    status: 'pending',
    suggestedActivities: []
  }
  renderCardBack(newTrip)
  // validatePost(newTrip)

  event.target.reset()

}
const publishTrip = (event) => {
  event.preventDefault()
  console.log('click')
  console.log(newTrip)
  validatePost(newTrip)
}

const validatePost = (obj) => {
  postTrip(obj)
    .then(response => {
      return fetch("http://localhost:3001/api/v1/trips")
    })
    .then(response => response.json())
    .then(data => {
      trips = new Trip(data.trips)
      userTrips = trips.findTrips(currentTraveler.id)
      renderCards(userTrips)
      return trips;
    })
    .catch(err => console.log(err))

}

//ALL DOM MANIPULATION DOWN HERE FOR CHANGING
//Query Selectoctor
console.log('here?', bookBtn)
submitTrip.addEventListener('submit', () => bookTrip(event)) // IF LEAVE COMMENT & JUSTIFY IT
bookBtn.addEventListener('click', () => publishTrip(event))
window.addEventListener('load', invokeFetch) // should this be here or in dom


//
