const Sequelize = require("sequelize")
const shortid = require("shortid")
const config = require("config")
module.exports = (sequelize) => {
  const result = sequelize.define('poster', {
    posterId: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: shortid,
    },
    posterDate: {
      type: Sequelize.DATE,
      isPersonalData: true,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      isPersonalData: true,
      allowNull: false
    },
    dedication: {
      type: Sequelize.STRING,
      isPersonalData: true,
      allowNull: false,
      defaultValue: ""
    },
    style: {
      type: Sequelize.STRING,
      defaultValue: "minimal",
      validate: {
        isIn: [["minimal", "night"]]
      }
    },
    showStars: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    showMilkyway: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    showCoordinateNet: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    showConstellations: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    lat: {
      type: Sequelize.DOUBLE,
      validate: {
        min: -90,
        max: 90
      },
      allowNull: false
    },
    long: {
      type: Sequelize.DOUBLE,
      validate: {
        min: -180,
        max: 180
      },
      allowNull: false
    },
    version: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.1
    }
  }, {
    freezeTableName: true,
    tableName: 'poster',
  });

  return result
}
