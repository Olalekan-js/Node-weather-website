const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibGVrYW4yMCIsImEiOiJjazlvODFmN3gwN2ZuM3NwbTFzaHd3cDAxIn0.vh9LXef53rn5187xddqy0A`;

    request({ url, json: true }, (error, { body }) => {

        if(error) {
            callback(`Unable to connect to geocode services. Check your network.`);

        } else if(body.message === "Not Found" || body.features.length === 0) {
            callback(`Unable to find geo-coordinate. Try another search term.`);

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location_name: body.features[0].place_name
            })
        }
    })

}

// geocode(location, (error, response) => {

// })

module.exports = geocode;