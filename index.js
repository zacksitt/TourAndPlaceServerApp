const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
// enable files upload
app.use(fileUpload({
    
    limits: {
        fileSize: 7 * 1024 * 1024 // 1 MB
    },
    abortOnLimit: true,
    createParentPath: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

const placeCtrl = require("./controllers/placeController");
const tourCtrl = require('./controllers/tourController')

app.get('/tours/:placeName',placeCtrl.get_tours_by_place)
app.get('/places/tree',placeCtrl.getAllPlaces)
app.get('/places',placeCtrl.get)
app.post('/place',placeCtrl.create);
app.put('/place',placeCtrl.create)
app.post('/upload-place-cover',placeCtrl.uploadPlaceCover)
app.delete('/place',placeCtrl.remove)

app.post('/upload-tour-cover',tourCtrl.uploadTourCover)
app.post('/upload-tour-covers',tourCtrl.uploadTourCovers)

app.get('/tours',tourCtrl.get)
app.post('/tour',tourCtrl.create)
app.put('/tour',tourCtrl.create)
app.delete('/tour',tourCtrl.remove)
app.post('/import-city-data',placeCtrl.importData)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});