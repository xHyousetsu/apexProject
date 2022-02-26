const legendsDB = require('./legends.mongo')
const DEFAULT_ID_NUMBER = 0;

//normalize
function normalize(str){
    return str.toLowerCase()
}

//implement getLegends
async function getLegends(){
    return await legendsDB
    .find({},{'__id':0,'__v':0})
    .sort({idNumber:1})
}

//Find
async function findLegend(filter, ){
    return await legendsDB.findOne(filter,{'__id':0,'__v':0});
}

//Find a specific legend by its name - use this to check if it exists
async function getOneLegend(legendName){
    return await findLegend({legendName:normalize(legendName)});
}

//Assign the id
async function getLatestLegendId(){
    const latestLegend = await legendsDB
        .findOne()
        .sort('-idNumber')
        
    if(!latestLegend){return DEFAULT_ID_NUMBER}
    return latestLegend.idNumber;
}

// createNewLegend
async function createNewLegend(legend){
    legend.legendName = normalize(legend.legendName)
    const newIdNumber = await getLatestLegendId()+1;
    const newLegend = Object.assign({
        idNumber:newIdNumber
    },legend);
    legendsDB.create(newLegend)
    return newLegend;
}

// deleteLegend
async function deleteLegend(filter){
    await legendsDB.deleteOne(filter);
}

module.exports = {
    getLegends,
    getOneLegend,
    createNewLegend,
    deleteLegend
}