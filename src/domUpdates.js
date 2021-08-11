var dayjs = require('dayjs');

import {
  destinations,
  trips,
  traveler,
  destinationData,
} from './scripts'


export let currentTraveler;
let userID;
export let userTrips;
export let userDestinations;

export const submitTrip = document.getElementById("book-trip")
export const calenderDate = document.getElementById("date")
export const tripDuration = document.getElementById("duration")
export const tripTravelers = document.getElementById("travelers")
export const dropdown = document.getElementById("dropdown")
export const backPage = document.getElementById("form-back")

const bookBtn = document.getElementById("book-btn")
const formContainer = document.getElementById("form-container")


const greeting = document.getElementById("greeting");
const cardContainer = document.getElementById("card-container")
const totalCost = document.getElementById("total-amount")
const bookAnotherTripBtn = document.getElementById("book-another-trip")
const formCard = document.getElementById("form-page")
const mainPage = document.getElementById("main-page")
const loginContainer = document.getElementById("login-container")
const loginBtn = document.getElementById("login-btn")
const username = document.getElementById("username")
const password = document.getElementById("password")
const errorMessage = document.getElementById("error-msg")
const navBar = document.getElementById('greeting')

/// LOGIN Functions
const login = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  validateUser(username.value, password.value)
}

const validateUser = (loginName, password) => {
  const usernameArray = loginName.split('traveler')
  userID = Number(usernameArray[1])

  if (!traveler.findUser(Number(usernameArray[1]))) {
    displayLoginError()
    return
  } else {
    validatePassword(password, userID)
  }
}

const validatePassword = (password, id) => {
  if (password === "travel") {
    validCred(id)
  } else {
    displayLoginError()
  }
}

const displayLoginError = () => {
  errorMessage.innerHTML = "<p>Opps, invalid username or password. <b>Please try again!</b> </p>"
}

const validCred = (id) => {
  currentTraveler = traveler.findUser(id)
  userTrips = trips.findTrips(id)
  userDestinations = destinations.findByTrips(userTrips)
  calenderDate.setAttribute("min", dayjs().format("YYYY-DD-MM"));

  loginContainer.classList.add("hidden");
  navBar.classList.remove("hidden");
  mainPage.classList.remove("hidden");

  renderPage()
}

//Render Page functions
const renderPage = () => {
  renderUser()
  renderCards(userTrips)
  renderDropdown()
}

const renderUser = () => {
  let greetingHTML = `Hello, ${currentTraveler.name}`
  greeting.innerHTML = greetingHTML;
}

export const renderCards = (userTripsArray) => {

  let cardContainerHTML = userTripsArray.map(trip => {

    return `<section class="trip-info" >
        <img class = "image" src = "${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
        <div class="text-info">
          <span class="status small-text"> ${trip.status}</span>
          <a>Your ${trips.findTenseOfTrip(trip)} trip to ${destinations.findById(trip.destinationID).destination}</a>
            <a class = "small-text">on ${dayjs(trip.date).format("MM/DD/YYYY")} </a>
            <a class = "small-text">for ${trip.travelers} travelers </a>
        </div>
      </section>`
  })

  cardContainer.innerHTML = cardContainerHTML;
};

const renderDropdown = () => {

  let dropdownHTML = "";
  destinationData.forEach(destination => {
    dropdownHTML += `
    <label for = "destinations" >Choose a destination:</label>
    <select class= "destinations input" id = "drop-down" name="destination" >
    <option value = "${destination.destination}" class = "input"> ${destination.destination}</option> </select>`
  })
  dropdown.innerHTML = dropdownHTML;
}

export const renderCardBack = (trip) => { // invoked in scripts

  let cardBackHTML = `<img class="image" src="${destinations.findById(trip.destinationID).image}" alt="${destinations.findById(trip.destinationID).alt}">
  <h2>A trip to ${destinations.findById(trip.destinationID).destination}</h2>
  <h2>will cost $${destinations.findTotalSpent([trip])}</h2>
  <div class="button-div">
    <button type="button" class="button book-it" id = "book-btn" name="book-it">Book it!</button>
    <button type="button" class="button no-thanks" name="no-thanks">No thanks</button>
  </div>`

  backPage.innerHTML = cardBackHTML;

  formCard.classList.add("hidden")
  backPage.classList.remove("hidden")
}

// EventListner Function
const totalSpent = () => {

  let yearTrips = trips.findTripsInYear()

  if (!destinations.findTotalSpent(yearTrips)) {
    totalCost.innerHTML = `You need to travel more! $0 spent in ${dayjs(trips.today).year()}`
  } else {
    totalCost.innerHTML = `Beautiful! You've spent $${destinations.findTotalSpent(yearTrips)} on trips in ${dayjs(trips.today).year()}`
  }
}

//Show/Hide functions
const showForm = (event) => {
  formContainer.classList.remove("hidden")
  formCard.classList.remove("hidden");
  mainPage.classList.add("hidden")
}

export const showCards = () => {
  formContainer.classList.add("hidden");
  backPage.classList.add("hidden");
  mainPage.classList.remove("hidden")
}

loginBtn.addEventListener('click', () => login(event))
bookAnotherTripBtn.addEventListener('click', showForm)
totalCost.addEventListener('click', totalSpent)
