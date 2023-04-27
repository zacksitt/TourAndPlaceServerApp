const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'tours_and_place',
   'root',
   'root@2020',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize