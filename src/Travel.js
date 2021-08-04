var dayjs = require('dayjs')
// This Travel test will take in all the data sets and be able to
// to sort the trip by traveler and price by trip....
class Travel {
  constructor(travelers, destinations, trips, date) { /// will all be arrays
    this.travelers = travelers;
    this.destinations = destinations;
    this.trips = trips;
    this.date = date; // I think this will achually be a dayjs function to show today's date.
    this.userTrips = []
    this.currentTrip;
  }
findTrips(id) {
  this.userTrips = this.trips.filter((trip) => trip.userID === id)
  return this.userTrips;
}

findCurrentTrip(){

  const currentTrip = this.userTrips.filter(trip => {
    let start = trip["date"];
    let end = dayjs(trip["date"]).add(trip["duration"], 'day').format('YYYY/MM/DD');
    if (dayjs(this.date).isBefore(end) && dayjs(this.date).isAfter(start)) {
      return trip;
    }
  })

  return this.currentTrip = currentTrip;
}

findPastTrips(){
  const pastTrips = this.userTrips.filter(trip => dayjs(this.date).isAfter(trip["date"])).filter(trip => !this.currentTrip.includes(trip))
  return pastTrips;
}

}

module.exports = Travel;
// or would this set the date?
