module.exports = (sequelize, DataTypes) => {
  const Showtime = sequelize.define('Showtime', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    totalCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Showtime;
};