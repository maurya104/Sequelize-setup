// Model for creating short url in the database
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {

    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Url;
};