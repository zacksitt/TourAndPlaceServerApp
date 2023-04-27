const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'tour_and_place',
   'webuser',
   'Md7oUeyRx56FBq5E',
    {
      host: '128.199.215.204',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize