const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kecamatan', {
    id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_kota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama_kecamatan: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kecamatan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_kecamatan" },
        ]
      },
    ]
  });
};
