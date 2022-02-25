//Require the .env file to safekeep tokens and users
require('dotenv').config();
//Require the necessary modules
const http = require('http');
const app = require('./app');

//Create a Port variable to store the environment value given
const PORT = process.env.PORT  || 3000;

//Create a variable to store the object that the .createServer returns
const server = http.createServer(app)

//Initialize the server
//TODO add async when the connection to the DB is ready
function startServer() {
    //await the connection to the DB
    //start the listening for the server
    server.listen(PORT, ()=> {
        console.log(`Apex server started on port ${PORT}`);
    })
}
//Call the function to initialize the server
startServer();