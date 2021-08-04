var dayjs = require('dayjs')
// This Travel test will take in all the data sets and be able to
// to sort the trip by traveler and price by trip....
class Travel {
  constructor(travelers, destinations, trips, date) { /// will all be arrays
    this.travelers = travelers;
    this.destinations = destinations;
    this.trips = trips;
    this.date = date;
    this.usersTrip = []
  }
findTrips(id) {
  this.usersTrip = this.trips.filter((trip) => trip.userID === id)
  return this.usersTrip;
}

findPastTrips(){
  const pastTrips = this.usersTrip.filter(trip => trip.date )
}

}

module.exports = Travel;
// or would this set the date?
