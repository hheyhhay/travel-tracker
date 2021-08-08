// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
// import Destination from './Destination';

import {allData} from './apiCalls';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

export let destinationData;
export let tripData;
export let travelerData;


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

}

const instantiation = () {
  let i = Math.floor(Math.random()*50)
  
}

invokeFetch()
