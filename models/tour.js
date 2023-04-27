const {Sequelize, DataTypes} = require("sequelize");
const Place = require('./place')
const sequelize = require("../db");

const Tour = sequelize.define("tours", {
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
      },
    languages: {
      type: DataTypes.JSON,
      allowNull:false
    },
    cover_url: {
        type: DataTypes.STRING,
        allowNull:false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull:true
    },
    sku: {
        type: DataTypes.STRING,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    content: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false
    },
    
    metadata: {
        type: DataTypes.JSON,
        allowNull:false
    },
    itineary: {
        type: DataTypes.JSON,
        allowNull:false
    }
 });

 Tour.associate = (models) => {
  // associations can be defined here
  Tour.belongsTo(models.Place, { 
    foreignKey : "place_id",
    sourceKey : 'id'
  });

  // Tour.hasOne(models.Place, { foreignKey: 'place_id' });
};

 sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Tour;
 