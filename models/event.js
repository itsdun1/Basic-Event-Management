'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    event_name: DataTypes.STRING,
    event_start_time: DataTypes.DATE,
    event_end_time: DataTypes.DATE,
    event_duration: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'event',
  });

  event.associate = models => {
    event.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })
  }
  return event;
};
