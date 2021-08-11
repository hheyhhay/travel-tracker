var dayjs = require('dayjs');

import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {
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
  userTrips, // not being used.. but I think that might be the problem
  userDestinations, // sames sat trips
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

let tripData;
let newTrip;

//Functions
const invokeFetch = () => {
  allData
    .then(response => parseValues(response))
    .catch(err => console.log(err)) // ADD DOM ERROR!
}

const parseValues = (data) => {

  destinationData = data[0].destinations;
  tripData = data[1].trips;
  const travelerData = data[2].travelers;

  instantiation(destinationData, tripData, travelerData)
}

const instantiation = (destinationInfo, tripInfo, travelerInfo) => {
  traveler = new Traveler(travelerInfo)
  trips = new Trip(tripInfo);
  destinations = new Destination(destinationInfo)
}

const bookTrip = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  newTrip = {
    id: 1 + tripData.length++,
    userID: currentTraveler.id,
    destinationID: destinations.findId(dropdown.value),
    travelers: Number(tripTravelers.value),
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: Number(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
  console.log(tripData.length)
  console.log('newTrip in bookTrp', newTrip)
  renderCardBack(newTrip)
  event.target.reset()
}

const publishTrip = (event) => {
  event.preventDefault()
  console.log(event.target)
  if (event.target.className === "button book-it") {
    console.log('book-it')
    console.log(newTrip)
    validatePost(newTrip)
    // showCards();

  } else if (event.target.className === "button no-thanks") {
    console.log('no-thanks')
    let userTrips = trips.findTrips(currentTraveler.id)
    console.log('userTrips in nothnx', userTrips)
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
      console.log('AMI HERE!?!')
      console.log('userTrips in book after reinstants', userTrips)
      let userDestinations = destinations.findByTrips(userTrips)
      renderCards(userTrips)
      showCards();
      return trips
    })
    .catch(err => console.log(err))
  return
}

// Event Listeners
submitTrip.addEventListener('submit', () => bookTrip(event)) // IF LEAVE COMMENT & JUSTIFY IT
backPage.addEventListener('click', () => publishTrip(event))
window.addEventListener('load', invokeFetch)
