//CORE MODULES
const path = require('path')


//NPM MOdules
const express = require('express'); //Express libary exposes a single function
const hbs = require('hbs') 
const app = express();

//Project Modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //Sets express viewengine as hbs, express requires us to have the hbs template in views folder 
app.set('views', viewsPath) //Sets views directory to custom directory 
app.use(express.static(publicDirectoryPath)) //Express will run through and send directory. However, index.html has special name will be default 

hbs.registerPartials(partialsPath) //Takes argument to directory of partials 

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: "Robert Wang"
    }) //render allow us to render one of our views 
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: "Robert Wang"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: "Robert Wang",
        message: "this is help info"
    }) 
})



app.get('/weather', (req,res)=>{

    if (!req.query.address){
              return res.send( //Stops function execution so we don't send twice 
              {error: "You must provide a search term"}
              )
          }



    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //Destructure. However, if error we set default to blank object so it doesnt fail
        if (error) {
            return res.send( {error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {

          if (error) {
                return res.send( //Stops function execution so we don't send twice 
                {error: "You must provide a search term"}
                )
            }

            res.send(
                {
                    location,
                    forecast: forecastData,
                    address: req.query.address
                }
                
                )

        })
    })

})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: "404 Page",
        errorMessage: "Help Article Not Found",
        name:"Robert Wang"
    })
})



//Wildcar - * Match anything not matched so far 
app.get('*', (req,res)=>{
    res.render('404',{
        title: "404 Page",
        errorMessage: "Page not found.",
        name: "Robert Wang"
    })
})


//Start Server Up
//Common Development Port is Port 3000 
//Server will never stop 
app.listen(3000, ()=>{
    console.log("Server is now running on port 3000")
});

