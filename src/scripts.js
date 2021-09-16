var dayjs = require('dayjs');

import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {
  showFetchErrorMessage,
  showPostErrorMessage,
  dropdown,
  tripTravelers,
  tripDuration,
  calenderDate,
  submitTrip,
  backPage,
  renderCards,
  renderCardBack,
  showCards,
  currentTraveler,
  userTrips, 
  userDestinations,
} from './domUpdates';

import {
  allData,
  postTrip
} from './apiCalls';

// Gloabal Varibles
export let destinationData;
export let trips;
export let destinations;
export let traveler;
export let travelerData;
export let tripData;
export let newTrip;

//Functions
const invokeFetch = () => {
  allData
    .then(response => parseValues(response))
    .catch(err => showFetchErrorMessage())
}

const parseValues = (data) => {

  destinationData = data[0].destinations;
  tripData = data[1].trips;
  travelerData = data[2].travelers;

  instantiation(destinationData, tripData, travelerData)
}

export const instantiation = (destinationInfo, tripInfo, travelerInfo) => {
  traveler = new Traveler(travelerInfo)
  trips = new Trip(tripInfo);
  destinations = new Destination(destinationInfo)
}



const bookTrip = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  newTrip = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: destinations.findId(dropdown.value),
    travelers: Number(tripTravelers.value),
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: Number(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }

  renderCardBack(newTrip)
  event.target.reset()
}

const publishTrip = (event) => {
  event.preventDefault()

  if (event.target.className === "button button-back book") {
    validatePost(newTrip)

  } else if (event.target.className === "button button-back no-thanks") {
    let userTrips = trips.findTrips(currentTraveler.id)
    renderCards(userTrips)
    showCards()
  }
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
      let userDestinations = destinations.findByTrips(userTrips)
      renderCards(userTrips)
      showCards();
      return trips
    })
    .catch(err => showPostErrorMessage())
  return
}

// Event Listeners
submitTrip.addEventListener('submit', () => bookTrip(event))
backPage.addEventListener('click', () => publishTrip(event))
window.addEventListener('load', invokeFetch)
