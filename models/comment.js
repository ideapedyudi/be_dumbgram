'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belangsto ke tabel user
      comment.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'iduser'
        }
      })
    }
  };
  comment.init({
    idfeed: DataTypes.INTEGER,
    iduser: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};