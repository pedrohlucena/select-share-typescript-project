const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement


function addAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value
}

form.addEventListener('submit', addAddressHandler)