const destinationFetch = fetch("http://localhost:3001/api/v1/destinations")
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))

const tripFetch = fetch("http://localhost:3001/api/v1/trips")
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))


const travelerFetch = fetch("http://localhost:3001/api/v1/travelers")
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log(err))


export const allData = Promise.all((([destinationFetch, tripFetch, travelerFetch])))
  // .then(values => values)
  // .catch(err => console.log('could not retrieve data'))
