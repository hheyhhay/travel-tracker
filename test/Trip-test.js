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
    expect(trip.date).to.equal(dayjs().format('YYYY/MM/DD'))
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

  it('should be able to find current trip', () => {
    trip.findTrips(19);
    trip.findCurrentTrip();
    expect(trip.currentTrip).to.deep.equal([{
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

  it('should be able to find past trips', () => {
    trip.findTrips(19);
    trip.findCurrentTrip()
    trip.findPastTrips();
    expect(trip.pastTrips).to.deep.equal([{
      "id": 125,
      "userID": 19,
      "destinationID": 2,
      "travelers": 4,
      "date": "2019/12/22",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    }])
  })

  it('should be able to find present trips', () => {
    trip.findTrips(19);
    trip.findCurrentTrip();
    trip.findFutureTrips()
    expect(trip.futureTrips).to.deep.equal([ {
      "id": 14,
      "userID": 19,
      "destinationID": 35,
      "travelers": 1,
      "date": "2022/09/24",
      "duration": 10,
      "status": "approved",
      "suggestedActivities": []
    }])
  })

  it('should be able to find pending trips', () => {
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
      "status": "pending",
      "suggestedActivities": []
    }]

    trip = new Trip(trips)
    trip.findTrips(19)
    trip.findPendingTrips()

    expect(trip.pendingTrips).to.deep.equal([{
      "id": 14,
      "userID": 19,
      "destinationID": 35,
      "travelers": 1,
      "date": "2022/09/24",
      "duration": 10,
      "status": "pending",
      "suggestedActivities": []
    }])
  })

  it('should be able to find cost per trip', () => {

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
