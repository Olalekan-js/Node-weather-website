const request = require('request');
// lat=60.99&lon=30.9

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,current&appid=67442b55b23d59f041e87727895994c7`;

    request({ url, json: true }, (error, { body, errorResponse}) => {
        if(error) {
            callback(`Unable to connect to weather services. Check your network.`);

        } else if(errorResponse) {
            callback(`Unable to find location. Try another search term`);

        } else {
            callback(undefined, `Weather's description: ${body.daily[0].weather[0].description}. Temperature is ${body.daily[0].temp.day} deg.`);
        }
    })
}

// forecast(60.99, 30.9, (error, data) => {
//     console.log(`Error: ${error}`);
//     console.log(`Response: ${data}`);
// })

module.exports = forecast;