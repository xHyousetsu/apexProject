//require the necessary modules
const path = require('path');
const express = require('express');
const api = require('./routes/api');
const handlebars  = require('express-handlebars');
//store the express object into the app variable
const app = express();

//give the server the ability to understand json objects
app.use(express.json());

//serving the public static files
app.use(express.static(path.join(__dirname, '..','public')))

//API entrance and versioning
app.use('/v1', api)

//Setting the rendering engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))



//Managing the entrance to our landing page
app.get('/', (req, res) => {
    res.render('landing',{title: 'Landing page'})
})


//Managing possible not found pages and internal server errors
app.use((req, res,next) => {
    res.status(404);
    res.render('404',{title: '404 code'});
});

app.use((err,req, res,next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500', {title: '500 code'});
})

//export the app object to be used on server.js by the createServer method
module.exports = app