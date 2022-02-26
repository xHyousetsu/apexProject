require('dotenv').config();

// TODO: implement and call functions from legends.model
const {
    getLegends,
    getOneLegend,
    createNewLegend,
    deleteLegend
} = require('../../models/legends.model')

// TODO: implement the httpGetLegends

async function httpGetLegends(req, res){
    const allLegends = await getLegends()
    return res.status(200).json(allLegends)
}

// TODO: implement the httpGetOneLegend
async function httpGetOneLegend(req,res){
    const legendName = req.params.id
    const legendRequested = await getOneLegend(legendName)
    if(!legendRequested){
        return res.status(404).json({error: `This legend hasn't arrived to the games yet`})
    }
    return res.status(200).json(legendRequested)
}
// TODO: implement the httpCreateNewLegend
async function httpCreateNewLegend(req,res){
    const legend = req.body;
    if (
        !legend.legendName || 
        !legend.ultimateAbility || 
        !legend.tacticalAbility || 
        !legend.legendType ||
        !legend.isLowProfile ||
        !legend.isFortified ||
        !legend.seasonOfRelease
        ){
        return res.status(400).json({error: 'missing required legend properties'})
    }
    if (await getOneLegend(legend.legendName)) {
        return res.status(400).json({error: 'a Legend with this name already joined the games, please choose a different name'})
    }else {
        if (legend.official === 'true'){
            if (legend.token !== process.env.OFFICIAL_TOKEN ||!legend.token){
                return res.status(400).json({error: 'You set this legend as official but the token to set it is not correct'})
            }
        }
        delete legend.token;
        const newLegend = await createNewLegend(legend)
        return res.status(201).json(newLegend)
    }
    
    
}
// TODO: implement the httpDeleteLegend
async function httpDeleteLegend(req,res){
    const filter = req.body
    const legendExist = await getOneLegend(filter.legendName)
    if (!legendExist) return res.status(404).json({error:'Legend not found'});
    if (legendExist.official === true) return res.status(404).json({error:`You can't delete this legend`});
    await deleteLegend(filter);
    return res.status(200).json(legendExist)
}

module.exports = {
    httpGetLegends,
    httpGetOneLegend,
    httpCreateNewLegend,
    httpDeleteLegend
}