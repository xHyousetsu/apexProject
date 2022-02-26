const express = require('express');
const {legendsRouter} = require('./legends/legends.router')


const api = express.Router();

api.use('/legends', legendsRouter)

module.exports = api