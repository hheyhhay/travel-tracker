var dayjs = require('dayjs');

class Trip {
  constructor(tripData){
    this.tripData = tripData;
    this.date = dayjs().format('YYYY/MM/DD');
    this.userTrips;
    this.currentTrip;
    this.pastTrips;
    this.futureTrips;
    this.pendingTrips;
    this.tripsThisYear;
  }
  findTrips(id) {
    this.userTrips = this.tripData.filter((trip) => trip.userID === id)

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
    this.pastTrips = this.userTrips.filter(trip => dayjs(this.date).isAfter(trip["date"])).filter(trip => !this.currentTrip.includes(trip))
    return this.pastTrips;
  }

  findFutureTrips(){
    this.futureTrips = this.userTrips.filter(trip => dayjs(this.date).isBefore(trip["date"])).filter(trip => !this.currentTrip.includes(trip))
    return this.futureTrips;
  }

  findPendingTrips(){
    this.pendingTrips =this.userTrips.filter(trip => trip["status"] === "pending");
    return this.pendingTrips;
  }

  findTripsInYear() {
    let startOfYear = dayjs(this.date).startOf('year').format('YYYY/MM/DD')
    let endOfYear = dayjs(this.date).endOf('year').format('YYYY/MM/DD')

    this.tripsThisYear = this.userTrips.filter(trip => dayjs(trip["date"]).isAfter(startOfYear, 'day') && dayjs(trip["date"]).isBefore(endOfYear, 'day') )
    return this.tripsThisYear;
  }
}

module.exports = Trip;
