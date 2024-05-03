const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    id_location: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_mitra: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_provinsi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_kota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'location',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_location" },
        ]
      },
    ]
  });
};
