// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

import {allData, destinationData, tripData, travelerData} from './apiCalls';



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');
// const fetchData = () => {
//   addData(trip)
// }
const invokeFetch = () => {
  allData.then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))
}
