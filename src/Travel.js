var dayjs = require('dayjs')
// This Travel test will take in all the data sets and be able to
// to sort the trip by traveler and price by trip....
class Travel {
  constructor(travelers, destinations, trips, date) { /// will all be arrays
    this.travelers = travelers;
    this.destinations = destinations;
    this.trips = trips;
    this.date = date;
    this.userTrips = []
  }
findTrips(id) {
  this.userTrips = this.trips.filter((trip) => trip.userID === id)
  return this.userTrips;
}

findPastTrips(){
  const pastTrips = this.userTrips.forEach(trip => {
    console.log('!', trip.date)
    console.log('?', this.date)
    dayjs(this.date).isBefore(dayjs(trip.date))
    // console.log('?!')
    return trip.date;
  })

  // console.log(dayjs('20 1/03/03').isBefore('2020/09/09'))
  // console.log(pastTrips)

  return pastTrips;
}

}

module.exports = Travel;
// or would this set the date?
