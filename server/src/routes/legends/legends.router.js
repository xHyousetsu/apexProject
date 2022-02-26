const express = require('express');
const {
    httpGetLegends,
    httpGetOneLegend,
    httpCreateNewLegend,
    httpDeleteLegend
} = require('./legends.controller')

//defining our router to manage Legends related petitions
const legendsRouter = express.Router();

legendsRouter.get('/',httpGetLegends);

legendsRouter.get('/:id',httpGetOneLegend);

legendsRouter.post('/',httpCreateNewLegend);

 legendsRouter.delete('/',httpDeleteLegend);

 module.exports = {
     legendsRouter
 }