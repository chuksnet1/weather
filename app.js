//jshint esversion: 6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { debug } = require("console");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("home", {cityNamey: "__ ___", cityTemp:"__ __", windCity: "__ __", humidityCity: "__ __", weatherImage: "__ __"})
});


app.post("/", function (req, res) {

    const city = req.body.cityName

    if (!city) {
        return res.redirect("/");
    }

    const units = 'metric'
    const API = "Api"
    
    async function fetchApi() {

        try {
            const endPoint = new URL('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=API&units=metric');

       
        const response = await fetch(endPoint)

        const data = await response.json()

        console.log(data.name);
        const cityMe = data.name;
        var icon = data.weather[0].icon;
        const tempCity = data.main.temp;
        const cityWind = data.wind.speed
        const cityHumidity = data.main.humidity;
        var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"



        res.render("home", { cityNamey: cityMe, cityTemp: tempCity, windCity: cityWind, humidityCity: cityHumidity, weatherImage: imageUrl});
        //console.log(data)
        } catch (error) {
            console.log(error)
            return res.redirect("/");
        }
        
        
    }

    fetchApi()


})

app.listen(3000, function () {
    console.log("port is listening at port 3000")
});
