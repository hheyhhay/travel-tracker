import chai from 'chai';
const expect = chai.expect;

describe('Traveler', function() {
  let travelers;
  let trips;
  beforeEach(() => {

    travelers = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer",
    }, {
      "id": 19,
      "name": "Felicdad Rishbrook",
      "travelerType": "thrill-seeker",
    }]

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
      "date": "2022/11/20",
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
    }]


  })
  it('should return true', function() {
    expect(true).to.equal(true);
  });
  it('should show all past trips')
});
