const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define paths for express config
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')  // set up handle bars engine and it's dynamic
app.set('views', viewsPath) //rename views folder
app.use(express.static(publicDir)) // set up static directory to serve
hbs.registerPartials(partialsPath) // set up partials

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Liz'
    }) // render views and the argument doesn't have to be full dir as long as it matches name
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Liz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'Do you need help?',
        title: 'Help',
        name: 'Liz'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product:[]
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, location = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(location,(err, report) => {
            if (err) {
                return res.send({error: err})
            }
            res.send({
                location: location.location,
                address: req.query.address,
                forecast: report
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        errMsg:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})