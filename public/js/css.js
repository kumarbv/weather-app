console.log('Client side script loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => { 
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                // console.log(data.place)
                // console.log(data.forecast)
                messageOne.textContent = data.place
                messageTwo.textContent = data.forecast
            }
        })
    })
})