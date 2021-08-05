var dayjs = require('dayjs')
// This Travel test will take in all the data sets and be able to
// to sort the trip by traveler and price by trip....
class Travel { /// use arrays as hint of what type of classes needed.
  constructor(travelers, destinations, trips, date) { /// will all be arrays
    this.travelers = travelers;
    this.destinations = destinations;
    this.trips = trips;
    this.date = date; // I think this will achually be a dayjs function to show today's date.
    this.userTrips = []
    this.currentTrip;
    this.userDestinations = [];
  }

  // could sum down information in parent class so it is only parsing one traveler their trips and their desitings?
  
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

findFutureTrips(){
  const futureTrips = this.userTrips.filter(trip => dayjs(this.date).isBefore(trip["date"])).filter(trip => !this.currentTrip.includes(trip))
  return futureTrips;
}

findDestinations() {
  let userDestinationIds = this.userTrips.map(trip => trip.destinationID)
  this.userDestinations = this.destinations.filter(destination => userDestinationIds.includes(destination["id"]))
  return this.userDestinations;
}

findYearTravel() {
  // console.log(dayjs(this.date).startOf('year'))
  let tripsThisYear = this.trips.filter(trip => trip["date"].isAfter(dayjs(this.date)).startOf('year') && trip["date"].isBefore(dayjs(this.date).endOf('year')))
  // let yearTravel = this.userDestinations.filter(destination => destination[])
  console.log(tripsThisYear)
}

calculateAnnualCosts() {
  // does this include trips over a year old? And future trips w/in the year?
  // Are pending trips paid for or not?

}

}

module.exports = Travel;
// or would this set the date?
