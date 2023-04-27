const Place = require("../models/place");
const Tour = require("../models/tour");
const City = require("../models/city")
const axios = require("axios");
const {API_URL} = require("../config")

const get = async (req,res) => {
    let places = await Place.findAll({order:[['id','DESC']]});
    res.send({places})
}
const create = async (req,res) => {

    let place = req.body;
    place.cover_url ="";
    place.metadata = {
        title:req.body.metadata_title,
        description:req.body.metadata_description
    }
    delete place.metadata_title;
    delete place.metadata_description

    place.faqs_of_places = {
        title:req.body.faqs_of_places_title,
        description:req.body.faqs_of_places_description
    }
    delete place.faqs_of_palace_title;
    delete place.faqs_of_palace_description;
    

    if(place.id){
        delete place.cover_url;    
        await Place.update(place,{where:{id:place.id}})
        let palaces = await Place.findAll();
        res.send({status:1,"msg":"Updated place successfully",places:palaces})
    }else{
        let newPlace =await Place.create(place);
         res.send({status:1,"msg":"Created new place successfully",place:newPlace})
    }
    
}

const remove = async(req,res) => {
    let place = req.body;
    await Place.destroy({where:{id:place.id}})
    res.send({status:1,"msg":"Deleted place successfully"})
}

const get_tours_by_place = async (req,res) => {
    let tourPlace = await Place.findOne({where:{"slug":req.params.placeName}});
    let tours = await Tour.findAll({where:{place_id:tourPlace.id}})
    res.send({status:1,"data":tours})
}

const getAllPlaces = async (req,res) => {
    let places = await Place.findAll();
    res.send({status:1,"data":places})
}
const importData = async (req,res) => {
    const cities = await axios.get('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json');
    for (const city of cities.data) {
        await City.create(city);
    }

    res.send({status:1,"msg":"Imported data from api"})
}
const uploadPlaceCover = async (req,res) => {

    let placeid = req.body.place_id;
    let cover = req.files.file;
    cover.mv("./uploads/places/" + cover.name);
    var fullUrl = API_URL + "/places/" + cover.name;
    let uploadres = await Place.update({cover_url:fullUrl},{where:{id:parseInt(placeid)}})

    let palaces = await Place.findAll();
    res.send({status:1,"msg":"Updated place successfully",places:palaces})

}

module.exports = {
    get,
    create,
    remove,
    get_tours_by_place,
    getAllPlaces,
    importData,
    uploadPlaceCover
}