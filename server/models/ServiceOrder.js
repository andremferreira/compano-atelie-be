const Sequelize = require('sequelize')
const withDateNoTz = require('sequelize-date-no-tz-postgres');
module.exports = (sequelize, DataTypes) => {
  const seq = withDateNoTz(Sequelize)
  const ServiceOrder = sequelize.define('ServiceOrder', {
    id_service_order: {
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
    id_service_owner: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    id_budget: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }, 
    nu_vservice: {
      allowNull: false,
      type: Sequelize.NUMERIC(10,2)
    },
    bo_canceled: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bo_received: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bo_paid: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bo_delivered: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  ServiceOrder.associate = function (models) {
    ServiceOrder.belongsTo(models.User, {
      foreignKey: 'id_user',
      constraints: false,
      through: 'service_order_assoc_owner'
    });
    ServiceOrder.schema('atelie') 
  };
  ServiceOrder.associate = function (models) {
    ServiceOrder.belongsTo(models.User, {
      foreignKey: 'id_user',
      constraints: false,
      through: 'service_order_assoc_user'
    });
    ServiceOrder.schema('atelie') 
  };
  ServiceOrder.associate = function (models) {
    ServiceOrder.belongsTo(models.Client, {
      foreignKey: 'id_client',
      constraints: false,
      through: 'service_order_assoc_client'
    });
    ServiceOrder.schema('atelie') 
  };
  ServiceOrder.associate = function (models) {
    ServiceOrder.belongsTo(models.Budget, {
      foreignKey: 'id_budget',
      constraints: false,
      through: 'service_order_assoc_budget'
    });
    ServiceOrder.schema('atelie') 
  };
  return ServiceOrder;
};