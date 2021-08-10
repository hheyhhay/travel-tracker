import chai from 'chai';
const expect = chai.expect;
const Destination = require('../src/Destination')
const Trip = require('../src/Trip')
var dayjs = require('dayjs');

describe.only('Destination', () => {
  let destinations;
  let destination;
  let trips;
  let trip;

  beforeEach(() => {
    destinations = [{
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
    }, {
      "id": 35,
      "destination": "Anchorage, Alaska",
      "estimatedLodgingCostPerDay": 200,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "man riding on kayak surrounded by mountains"
    }, {
      "id": 27,
      "destination": "San Francisco, California",
      "estimatedLodgingCostPerDay": 175,
      "estimatedFlightCostPerPerson": 200,
      "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "golden gate bridge during the day time"
    }, {
      "id": 37,
      "destination": "Frankfurt, Germany",
      "estimatedLodgingCostPerDay": 1100,
      "estimatedFlightCostPerPerson": 150,
      "image": "https://images.unsplash.com/photo-1564859117892-8c3657465bfb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
      "alt": "grey concrete bridge at night"
    }]

    destination = new Destination(destinations)
    trips = [{
      "id": 125,
      "userID": 19,
      "destinationID": 2,
      "travelers": 4,
      "date": "2019/12/22",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 14,
      "userID": 19,
      "destinationID": 35,
      "travelers": 1,
      "date": "2022/09/24",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 16,
      "userID": 19,
      "destinationID": 27,
      "travelers": 1,
      "date": "2021/08/02",
      "duration": 9,
      "status": "approved",
      "suggestedActivities": []
    }, {
      "id": 62,
      "userID": 1,
      "destinationID": 37,
      "travelers": 4,
      "date": "2020/08/07",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    }];

    trip = new Trip(trips);
    trip.findTrips(19);
  })

  it('should be a function', () => {
    expect(destination).to.be.an.instanceOf(Destination)
  })

  it('should be able to find destination by id', () => {

    expect(destination.findById(2)).to.deep.equal({
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
    })
  })

  it('should be able to find destinationID by destination name', () => {

    expect(destination.findId("San Francisco, California")).to.deep.equal(27)
  })
  it('should be able to find all destinations of trips for user', () => {
    destination.findByTrips(trip.userTrips)
    expect(destination.userDestinations).to.deep.equal([{
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
    }, {
      "id": 35,
      "destination": "Anchorage, Alaska",
      "estimatedLodgingCostPerDay": 200,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "man riding on kayak surrounded by mountains"
    }, {
      "id": 27,
      "destination": "San Francisco, California",
      "estimatedLodgingCostPerDay": 175,
      "estimatedFlightCostPerPerson": 200,
      "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "golden gate bridge during the day time"
    }])
  })

  it('should be able find total cost of trips this year', () => {
    destination.findByTrips(trip.userTrips)
    trip.findTripsInYear();
    destination.findTotalSpent(trip.tripsThisYear)

    expect(destination.findTotalSpent(trip.tripsThisYear)).to.deep.equal(1952.50)
  })
})
