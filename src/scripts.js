//This is for lighthouse run!
var dayjs = require('dayjs');

import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {
  renderPage,
  dropdown,
  tripTravelers,
  tripDuration,
  calenderDate,
  submitTrip,
  backPage,
  bookBtn,
  formContainer,
  renderCards,
  renderCardBack,
  showCards,
  currentTraveler,
  userTrips,
  userDestinations,
  userID
} from './domUpdates';
import {
  allData,
  postTrip
} from './apiCalls';

// Gloabal Varibles
export let destinationData; // may not need to  be global
export let tripData; // may not need to  be global
export let travelerData; // may not need to  be global
// export let currentTraveler;
export let trips;
export let destinations;
// export let userTrips;
// export let userDestinations;
export let traveler;
let newTrip;

export const invokeFetch = () => {
  allData
    .then(response => parseValues(response))
    .catch(err => console.log(err)) // ADD DOM ERROR!
}

const parseValues = (data) => {

  destinationData = data[0].destinations;
  tripData = data[1].trips;
  travelerData = data[2].travelers;

  instantiation()
  // renderPage()
}

const instantiation = () => {
  // let i = Math.floor(Math.random() * 50);
  traveler = new Traveler(travelerData)
  trips = new Trip(tripData);
  destinations = new Destination(destinationData)

  // userTrips = trips.findTrips(i)
  // userDestinations = destinations.findByTrips(userTrips)
}


const bookTrip = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  newTrip = {
    id: 1 + tripData.length++,
    userID: currentTraveler.id,
    destinationID: destinations.findId(dropdown.value),
    travelers: tripTravelers.value,
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: tripDuration.value,
    status: 'pending',
    suggestedActivities: []
  }

  renderCardBack(newTrip)
  event.target.reset()
}

const publishTrip = (event) => {
  event.preventDefault()

  validatePost(newTrip)
  showCards();
}

const validatePost = (obj) => {
  postTrip(obj)
    .then(response => {
      return fetch("http://localhost:3001/api/v1/trips")
    })
    .then(response => response.json())
    .then(data => {
      trips = new Trip(data.trips)
      let userTrips = trips.findTrips(currentTraveler.id)
      renderCards(userTrips)
      return trips;
    })
    .catch(err => console.log(err))

}

// Event Listeners
submitTrip.addEventListener('submit', () => bookTrip(event)) // IF LEAVE COMMENT & JUSTIFY IT
backPage.addEventListener('click', () => publishTrip(event))
window.addEventListener('load', invokeFetch) // should this be here or in dom
