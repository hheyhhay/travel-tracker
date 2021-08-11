class Traveler {
  constructor(travelerData) { 
    this.users = travelerData;
  }

  findUser(id){
    const user = this.users.find(user => user.id === id)
    return user;
  }
}

module.exports = Traveler;
