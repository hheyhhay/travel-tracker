// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import {renderPage} from './domUpdates';
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

invokeFetch()



//ALL DOM MANIPULATION DOWN HERE FOR CHANGING
//Query Selectoctor




//
