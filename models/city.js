const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../db");

const City = sequelize.define("cities", {
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull:false
    }
 });

 sequelize.sync().then(() => {
    console.log('City table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = City;
 