'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ke tabel followers
      user.hasMany(models.follow, {
        as: 'following',
        foreignKey: {
          name: 'followers'
        }
      })
      // ke tabel following
      user.hasMany(models.follow, {
        as: 'follower',
        foreignKey: {
          name: 'followings'
        }
      })
      // hasOne ke database feed
      user.hasMany(models.feed, {
        as: 'feed',
        foreignKey: {
          name: 'userFeed'
        }
      })
    }
  };
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};