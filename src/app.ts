const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

function addAddressHandler(event: Event) {
    event.preventDefault()
    const enteredAddress = addressInput.value
}

form.addEventListener('submit', addAddressHandler)