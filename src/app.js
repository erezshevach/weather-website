const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

   
// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Erez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Erez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Erez',
        contactDetails: 'ez@help.com'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({ error: 'address term must be provided' })
    }

    geocode(address,  (error, {lat, lng, placeName} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, lng, (error, {forecast} = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                    address,
                    placeName,
                    forecast
            })
        })
    })

})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'A search term must be provided'
        })
    }
    console.log(req.query)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops...',
        errorMsg: 'Help article not found.',
        name: 'Erez'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops...',
        errorMsg: 'Page not found.',
        name: 'Erez'
    })
})



app.listen(port, () => {
    console.log('server is up and running on port ' + port)
})
