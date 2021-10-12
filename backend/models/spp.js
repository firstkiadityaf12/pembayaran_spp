'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // spp dengan siswa
      this.hasMany(models.siswa, {
        foreignKey: "id_spp",
        as: "siswa"
      })
      //spp dengan pembayaran
      this.hasMany(models.pembayaran, {
        foreignKey: "id_spp",
        as: "pembayaran"
      })
    }
  };
  spp.init({
    id_spp:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    angkatan: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'spp',
    tableName: 'spp'
  });
  return spp;
};