const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

/* Define Paths for Express Config */
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


/* Setup Handlebars engine and view location */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to Serve
app.use(publicDirectoryPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jon Hoke'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jon Hoke'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jon Hoke'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must search for an address.'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Started in port ' + port)
})// common development port for local machine