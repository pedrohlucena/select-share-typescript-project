import axios from 'axios'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

type Coordinates = {
    lat: number,
    lng: number
}

interface GoogleGeocodingApiResponse {
    results: Array<{
        geometry: {
            location: Coordinates
        }
    }>,
    status: "OK"| "ZERO_RESULTS"
}

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

function appendGoogleMapsSDKScriptTag() {
    const googleMapsSDKScriptTag = document.createElement('script');
    googleMapsSDKScriptTag.setAttribute('async', '');
    googleMapsSDKScriptTag.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`)
    const titleHtmlElement = document.querySelector('title')! as HTMLTitleElement
    titleHtmlElement.insertAdjacentElement('afterend', googleMapsSDKScriptTag)
}

async function addAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value

    const response = await axios.get<GoogleGeocodingApiResponse>
        (`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    
    if(response.data.status !== "OK") { throw new Error("Could not fetch location!") }
    const coordinates = response.data.results[0].geometry.location 
    initMap(coordinates)
}

function initMap(coordinates: Coordinates) {
    let map: google.maps.Map;
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 20,
    })
    new google.maps.Marker({
        position: coordinates,
        map: map,
    })
}
function main() {
    try {
        appendGoogleMapsSDKScriptTag()
        form.addEventListener('submit', addAddressHandler)
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
            console.error(error)
        }
    }
}

main()