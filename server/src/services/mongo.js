require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
    console.log('Apex Legends DB connection established')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect(){
    await mongoose.connect(process.env.MONGO_URL)
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}