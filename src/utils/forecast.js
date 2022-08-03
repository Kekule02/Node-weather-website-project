const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a7940c284176fd3b3eba051e51ca3ad6&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!.", undefined);
    } else if (body.message) {
      callback("Unable to find location!");
    } else {
      console.log(body);
      callback(
        undefined,
        `${body.weather[0].description}. It is currently ${body.main.temp}. The temperature low for today is ${body.main.temp_min} and high is ${body.main.temp_max}.`
      );
    }
  });
};
module.exports = forecast;
