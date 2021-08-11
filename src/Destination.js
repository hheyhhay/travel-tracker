var dayjs = require('dayjs');

class Destination {
  constructor(destinationData) {
    this.destinations = destinationData;
    this.userDestinations;
  }

  findById(id) {
    return this.destinations.find(destination => destination.id === id)
  }

  findByTrips(trips) {
    const userDestinationIds = trips.map(trip => trip["destinationID"])
    this.userDestinations = this.destinations.filter(destination => userDestinationIds.includes(destination["id"]))
    return this.userDestinations;
  }

  findId(destinationName) {
    const id = this.destinations.find(destination =>  destination.destination === destinationName).id;
    return id;
  }



  // findPriceByTrip(trip){
  //   const totalByTraveler = trip.travelers *
  // }
  findTotalSpent(trips) {
    console.log('HERE?!')
    const total = trips.reduce((sum, trip) => {
      let lodgingSum = 0;
      let flightSum = 0;
      sum += lodgingSum + flightSum;
      this.userDestinations.forEach(destination => {
        if (destination["id"] === trip["destinationID"]) {
          lodgingSum = destination["estimatedLodgingCostPerDay"] * trip["duration"];
          flightSum = destination["estimatedFlightCostPerPerson"] * trip["travelers"];
          return sum = lodgingSum + flightSum;
        }
      })
      return sum;
    }, 0)

    const agentFee = total + total * .1;
    return agentFee;
  }

  // findSingleTripCost(trip) {
  //
  // }
};

module.exports = Destination;
