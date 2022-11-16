import axios from 'axios'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

interface GoogleGeocodingApiResponse {
    results: Array<{
        geometry: {
            location: {
                lat: number,
                lng: number
            }
        }
    }>,
    status: "OK"| "ZERO_RESULTS"
}

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

function addAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value

    axios.get<GoogleGeocodingApiResponse>
        (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
            .then(response => {
                if(response.data.status !== "OK") { throw new Error("Could not fetch location!") }
                const coordinates = response.data.results[0].geometry.location 
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
}

form.addEventListener('submit', addAddressHandler)