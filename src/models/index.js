const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const Category = require('./Category')(sequelize, Sequelize.DataTypes);
const Movie = require('./Movie')(sequelize, Sequelize.DataTypes);
const Showtime = require('./Showtime')(sequelize, Sequelize.DataTypes);
const Ticket = require('./Ticket')(sequelize, Sequelize.DataTypes);

Category.hasMany(Movie, { foreignKey: 'categoryId' });
Movie.belongsTo(Category, { foreignKey: 'categoryId' });

Movie.hasMany(Showtime, { foreignKey: 'movieId' });
Showtime.belongsTo(Movie, { foreignKey: 'movieId' });

Showtime.hasMany(Ticket, { foreignKey: 'showtimeId' });
Ticket.belongsTo(Showtime, { foreignKey: 'showtimeId' });

module.exports = { Category, Movie, Showtime, Ticket, sequelize, Sequelize };