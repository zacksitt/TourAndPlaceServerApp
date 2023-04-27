 const { DataTypes} = require("sequelize");
const sequelize = require("../db");
const Place = sequelize.define("places", {
   
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cover_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    type_of_place: {
      type: DataTypes.STRING,
      allowNull:false
    },
    type_of_place: {
        type: DataTypes.STRING,
        allowNull:false
    },
    code: {
        type: DataTypes.STRING,
        allowNull:true
    },
    parent: {
        type: DataTypes.STRING,
        allowNull:false
    },
    geo: {
        type: DataTypes.STRING,
        allowNull:false
    },
    place_view: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    name_of_place: {
        type: DataTypes.STRING,
        allowNull:false
      },
    description: {
        type: DataTypes.STRING,
        allowNull:false
    },
    content: {
        type: DataTypes.STRING,
        allowNull:false
    },
    metadata: {
        type: DataTypes.JSON,
        allowNull:false
    },
    faqs_of_places: {
        type: DataTypes.JSON,
        allowNull:false
    },
    created_at: {
        type: DataTypes.TIME
    },
    updated_at: {
      type: DataTypes.TIME,
    }
 });
 Place.associate = (models) => {
  // associations can be defined here
  Place.hasMany(models.Tour, { 
    foreignKey : "place_id"
  });

  // Tour.hasOne(models.Place, { foreignKey: 'place_id' });
};

 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Place;
 