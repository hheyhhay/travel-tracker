import chai from 'chai';
const expect = chai.expect;
const Trip = require('../src/Trip')
var dayjs = require('dayjs');



describe('Trip', () => {
  let trips;
  let trip;

  beforeEach(() => {
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
  })

  it('should be a function', () => {
    expect(trip).to.be.an.instanceOf(Trip)
  })

  it('should be able to record current date', () => {
    expect(trip.today).to.equal(dayjs().format('YYYY/MM/DD'))
  })

  it('should be able to find trips by userID', () => {
    trip.findTrips(19);
    expect(trip.userTrips).to.deep.equal([{
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
    }] )
  })

  it('should be able to return if trip is upcoming', () => {
    let tripInQuestion = {
      "id": 14,
      "userID": 19,
      "destinationID": 35,
      "travelers": 1,
      "date": "2022/09/24",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }
    expect(trip.findTenseOfTrip(tripInQuestion)).to.equal("upcoming")
  })

  it('should be able to return if trip is past', () => {
    let tripInQuestion = {
          "id": 14,
          "userID": 19,
          "destinationID": 35,
          "travelers": 1,
          "date": "2018/09/24",
          "duration": 10,
          "status": "approved",
          "suggestedActivities": []
        }
    expect(trip.findTenseOfTrip(tripInQuestion)).to.equal("previous")
  })

  it('should be able to return if trip is current', () => {
    let tripInQuestion = {
          "id": 14,
          "userID": 19,
          "destinationID": 35,
          "travelers": 1,
          "date": "2021/08/8",
          "duration": 10,
          "status": "approved",
          "suggestedActivities": []
        }
    expect(trip.findTenseOfTrip(tripInQuestion)).to.equal("current")
  })

  it('should be able to find trips for the current year', () => {
    trip.findTrips(19)
    trip.findTripsInYear()

    expect(trip.tripsThisYear).to.deep.equal([{
      "id": 16,
      "userID": 19,
      "destinationID": 27,
      "travelers": 1,
      "date": "2021/08/02",
      "duration": 9,
      "status": "approved",
      "suggestedActivities": []
    }])
  })
})
