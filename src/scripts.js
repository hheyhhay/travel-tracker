//This is for lighthouse run!
var dayjs = require('dayjs');

import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {
  // renderPage,
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
// export let currentTraveler;
export let destinationData;
export let trips;
export let destinations;
let tripData;
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
  const travelerData = data[2].travelers;

  instantiation(destinationData, tripData, travelerData)
}

const instantiation = (destinationInfo, tripInfo, travelerInfo) => {
  // let i = Math.floor(Math.random() * 50);
  traveler = new Traveler(travelerInfo)
  trips = new Trip(tripInfo);
  destinations = new Destination(destinationInfo)

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
    travelers: Number(tripTravelers.value),
    date: dayjs(calenderDate.value).format('YYYY/MM/DD'),
    duration: Number(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
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
      // console.log('userTrips in book', userTrips)
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
window.addEventListener('load', invokeFetch) // should this be here or in dom
