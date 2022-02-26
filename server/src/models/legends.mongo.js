const mongoose = require('mongoose');
const legendsScheema =  new mongoose.Schema({
    idNumber:{
        type: Number,
        required: true
    },
    legendName:{
        type: String,
        required: true,
    },
    legendType: {
        type: String,
        required: true
    },
    tacticalAbility:{
        type: String,
        required: true
    },
    ultimateAbility:{
        type: String,
        required: true
    },
    isLowProfile: {
        type: Boolean,
        required: true
    },
    isFortified:{
        type: Boolean,
        required: true
    },
    seasonOfRelease:{
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    official:{
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Legend', legendsScheema)