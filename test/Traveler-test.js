import chai from 'chai';
const expect = chai.expect;
const Traveler = require('../src/Traveler')

describe.only('Traveler', function() {
  let travelers;
  let traveler;
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

    traveler = new Traveler(travelers)

  })

  it('should be able to find user by id', function() {
    traveler.findUser(19)
    expect(traveler.findUser(19)).to.deep.equal({
      "id": 19,
      "name": "Felicdad Rishbrook",
      "travelerType": "thrill-seeker",
    });
  });

});
