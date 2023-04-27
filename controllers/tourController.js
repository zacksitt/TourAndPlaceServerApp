const Tour = require("../models/tour")
const Place = require("../models/place")
const sequelize = require("../db");
const {API_URL} = require("../config")
const get = async (req,res) => {
   
    let tours = await getAllTours();
    res.send({tours})
}

async function getAllTours(){
    const [tours,metadata] = await sequelize.query(
        "select tours.*,places.slug as place from tours left join places ON places.id = tours.place_id group by tours.id"
    );
    return tours;
}
const create = async (req,res) => {

    let tour = req.body;
    tour.cover_url ="";
    tour.metadata = {
        title:req.body.metadata_title,
        description:req.body.metadata_description
    }
    delete tour.metadata_title;
    delete tour.metadata_description

    if(tour.id){
        delete tour.cover_url;    
        await Tour.update(tour,{where:{id:tour.id}})
        res.send({status:1,"msg":"Updated place successfully"})

    }else{
        tour.images = [];
        tour.languages = [];
        tour.itineary = [];
        tour.place_id = 1;
        let newTour = await Tour.create(tour);
        res.send({status:1,"msg":"Created new place successfully",tour:newTour})
    }

}


const remove = async(req,res) => {
    
    let tour = req.body;
    await Tour.destroy({where:{id:tour.id}})
    res.send({status:1,"msg":"Deleted place successfully"})
}

const uploadTourCover = async (req,res) => {

    let tourid = req.body.tour_id;
    let cover = req.files.file;
    cover.mv("./uploads/tours/" + cover.name);
    var fullUrl = API_URL + "/tours/" + cover.name;
    let uploadres = await Tour.update({cover_url:fullUrl},{where:{id:parseInt(tourid)}})
    res.send({status:1,"msg":"Updated tour successfully"})

}

const uploadTourCovers = async (req,res) => {

    let tourid = req.body.tour_id;
    let images = [];
    for (let index = 1; index <= req.body.count; index++){
        let fileName = "file_" + index;
        let cover = req.files[fileName];
        cover.mv("./uploads/tours/" + cover.name);
        let fullUrl =  API_URL + "/tours/" + cover.name;
        images.push({"url":fullUrl});
    }
 
    let uploadres = await Tour.update({images:images},{where:{id:parseInt(tourid)}})
    res.send({status:1,"msg":"Updated tour successfully"})

}
module.exports = {
    get,
    create
    ,remove
    ,uploadTourCover
    ,uploadTourCovers
}