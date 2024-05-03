const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banner', {
    id_banner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tittle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_tittle: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_banner_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'banner',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_banner" },
        ]
      },
    ]
  });
};
