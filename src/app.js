const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(pubDirPath))

const port = process.env.PORT || 8080

// app.com

// The below code is useless because of the use of use function that is serving pubDirPath
// app.get('', (req, res) => {
//     res.send('Welcome')
// })

// Handlebars below (HBR for express)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        me: 'Dr. Kumar'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        me: 'Dr. Kumar'
    })
})



// The below code is useless because of the use of use function that is serving pubDirHelpPath
// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })


// app.com/about
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        me: 'Dr. Kumar'
    })
})

// The below code is useless because of the use of use function that is serving pubDirAboutPath

// app.get('/about', (req, res) => {
//     res.send('About Page')
// })

// app.com/title

// app.get('/title', (req, res) => {
//     res.send('<h1>Weather App</h1>')
// })

// app.com/weather

app.get('/weather', (req, res) => {
    console.log('1)',req.query.address)
    if (!req.query.address) {
        return res.send({
            error: 'The query string should contain address term'
        })
    }
    console.log('entering geocode')
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        console.log('2)', error, latitude, longitude)
        // console.log(req.query.address)
        if (!error) {
            res.send({error})
        } else {
            // res.send({
            //     forecast: forecastData,
            //     place: 'philidelphia',
            //     address: req.query.address
            // })
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                        forecast: forecastData,
                        place: place,
                        address: req.query.address
                    })
            })
        }
        
        // console.log(data)
        // console.log(data.latitude, data.longitude, data.place)
        // forecast(latitude, longitude, (error, forecastData) => {
        //     console.log('entering forecast')
        //     if (error) {
        //         return res.send({error})
        //     }
        //     res.send({
        //         forecast: forecastData,
        //         address: req.query.address
        //     })
        // }) 
    })
})

// app.get('/help/*', (req, res) => {
//     res.send('Error 404: Help Page you are looking for is not found')
// })

// app.get('*', (req, res) => {
//     res.send('Error 404: Page Not found')
// })

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Error 404: Help page Not found',
        me: 'Dr. Kumar',
        title: '404'
    })
    // res.send('Error 404: Help Page Not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        me: 'Dr. Kumar',
        title: '404'
    })
    // res.send('Error 404: Page Not found')
})


app.listen(port, () => {
    console.log('Server running on port: '+port)
})