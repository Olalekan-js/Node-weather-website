const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JIMOH Sikiru Olalekan',
        instructor: 'Andrew MEAD'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'JIMOH Sikiru Olalekan',
        instructor: 'Andrew MEAD'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'JIMOH Sikiru Olalekan',
        instructor: 'Andrew MEAD'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location_name}) => {
        if(error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error: error });
            }

            res.send({
                forecast: forecastData,
                location: location_name,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'JIMOH Sikiru Olalekan',
        instructor: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page not found',
        name: 'JIMOH Sikiru Olalekan',
        instructor: 'Andrew Mead'
    });
})

// Start up the server on port 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000");
})