class Traveler {
  constructor(travelerData) { // this comes from page log-in.
    this.users = travelerData;

  }
  findUser(id){
    const user = this.users.find(user => user.id === id)
    return user;
  }
}



// to get the information we need:
/*
Need to find all the matching userIDs from the travelers API
Then it will find all the trips that match the userID.
Need to return the date, duration, and status

Then it will need to parse throught the desitinationID

*/
module.exports = Traveler;
