'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // pembayaran to petugas
      this.belongsTo(models.petugas, {
        foreignKey: "id_petugas",
        as: "petugas"
      })
      // pembayaran to siswa
      this.belongsTo(models.siswa, {
        foreignKey: "nisn",
        as: "siswa"
      })
      //pembayaran to spp
      this.belongsTo(models.spp, {
        foreignKey: "id_spp",
        as: "spp"
      })
    }
  };
  pembayaran.init({
    id_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_petugas: DataTypes.INTEGER,
    nisn: DataTypes.INTEGER,
    tgl_bayar: DataTypes.DATE,
    bulan_spp: DataTypes.INTEGER,
    tahun_spp: DataTypes.INTEGER,
    id_spp: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName: 'pembayaran'
  });
  return pembayaran;
};