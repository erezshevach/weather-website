console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

msg1.textContent = ''
msg2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else if (data.forecast) {
                msg1.textContent = data.placeName
                msg2.textContent = data.forecast
            }
        })
    })
})
