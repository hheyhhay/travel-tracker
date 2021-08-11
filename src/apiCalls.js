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

export const postTrip = (tripObj) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    body: JSON.stringify(tripObj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
  .catch(err => console.log('error inside of API', err))
}
