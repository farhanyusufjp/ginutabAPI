var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _auth = require("./auth");
var _banner = require("./banner");
var _banner_type = require("./banner_type");
var _kecamatan = require("./kecamatan");
var _kota = require("./kota");
var _location = require("./location");
var _provinsi = require("./provinsi");
var _testimoni = require("./testimoni");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var auth = _auth(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);
  var banner_type = _banner_type(sequelize, DataTypes);
  var kecamatan = _kecamatan(sequelize, DataTypes);
  var kota = _kota(sequelize, DataTypes);
  var location = _location(sequelize, DataTypes);
  var provinsi = _provinsi(sequelize, DataTypes);
  var testimoni = _testimoni(sequelize, DataTypes);


  return {
    article,
    auth,
    banner,
    banner_type,
    kecamatan,
    kota,
    location,
    provinsi,
    testimoni,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
