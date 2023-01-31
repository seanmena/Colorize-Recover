module.exports = function(sequelize, DataTypes) {
  const colors = sequelize.define("colors", {
    hexcode: DataTypes.STRING,
    complementary: DataTypes.STRING
    // analogous: DataTypes.STRING,
    // monochromatic: DataTypes.STRING,
    // triad: DataTypes.STRING,
  });
  colors.associate = function (models) {

    colors.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    
  return colors;

};
