const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const Budget = sequelize.define('Budget', {
    id_budget: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_client: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    js_budget_service: {
      allowNull: false,
      type: Sequelize.JSON,
    },
    ts_create: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    },
    ts_update: {
      allowNull: false,
      type: seq.DATE_NO_TZ,
      defaultValue: seq.fn('now'),
    }
  }, {
    underscored: true,
    schema: 'atelie',
    timestamps: false
  });
  Budget.associate = function (models) {
    Budget.belongsTo(models.User, {
      foreignKey: 'id_user',
      constraints: false,
      through: 'budget_assoc_user'
    });
    Budget.schema('atelie') 
  };
  Budget.associate = function (models) {
    Budget.belongsTo(models.Client, {
      foreignKey: 'id_client',
      constraints: false,
      through: 'budget_assoc_client'
    });
    Budget.schema('atelie') 
  };
  return Budget;
};