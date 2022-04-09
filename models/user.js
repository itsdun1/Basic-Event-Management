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
      // define association here
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });


  user.associate = models => {
    user.hasMany(models.event, {
      onDelete: 'cascade',
      as: 'event'
    });

    user.hasMany(models.role, {
      onDelete: 'cascade',
      as: 'role'
    });

  }

  return user;
};
