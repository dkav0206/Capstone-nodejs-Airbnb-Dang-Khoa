const DataTypes = require("sequelize").DataTypes;
const _BinhLuan = require("./BinhLuan");
const _DatPhong = require("./DatPhong");
const _NguoiDung = require("./NguoiDung");
const _Phong = require("./Phong");
const _ViTri = require("./ViTri");

function initModels(sequelize) {
  const BinhLuan = _BinhLuan(sequelize, DataTypes);
  const DatPhong = _DatPhong(sequelize, DataTypes);
  const NguoiDung = _NguoiDung(sequelize, DataTypes);
  const Phong = _Phong(sequelize, DataTypes);
  const ViTri = _ViTri(sequelize, DataTypes);

  NguoiDung.belongsToMany(Phong, { as: 'ma_phong_Phongs', through: BinhLuan, foreignKey: "ma_nguoi_binh_luan", otherKey: "ma_phong" });
  NguoiDung.belongsToMany(Phong, { as: 'ma_phong_Phong_DatPhongs', through: DatPhong, foreignKey: "ma_nguoi_dat", otherKey: "ma_phong" });
  Phong.belongsToMany(NguoiDung, { as: 'ma_nguoi_binh_luan_NguoiDungs', through: BinhLuan, foreignKey: "ma_phong", otherKey: "ma_nguoi_binh_luan" });
  Phong.belongsToMany(NguoiDung, { as: 'ma_nguoi_dat_NguoiDungs', through: DatPhong, foreignKey: "ma_phong", otherKey: "ma_nguoi_dat" });
  BinhLuan.belongsTo(NguoiDung, { as: "ma_nguoi_binh_luan_NguoiDung", foreignKey: "ma_nguoi_binh_luan"});
  NguoiDung.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "ma_nguoi_binh_luan"});
  DatPhong.belongsTo(NguoiDung, { as: "ma_nguoi_dat_NguoiDung", foreignKey: "ma_nguoi_dat"});
  NguoiDung.hasMany(DatPhong, { as: "DatPhongs", foreignKey: "ma_nguoi_dat"});
  BinhLuan.belongsTo(Phong, { as: "ma_phong_Phong", foreignKey: "ma_phong"});
  Phong.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "ma_phong"});
  DatPhong.belongsTo(Phong, { as: "ma_phong_Phong", foreignKey: "ma_phong"});
  Phong.hasMany(DatPhong, { as: "DatPhongs", foreignKey: "ma_phong"});
  Phong.belongsTo(ViTri, { as: "ma_vi_tri_ViTri", foreignKey: "ma_vi_tri"});
  ViTri.hasMany(Phong, { as: "Phongs", foreignKey: "ma_vi_tri"});

  return {
    BinhLuan,
    DatPhong,
    NguoiDung,
    Phong,
    ViTri,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
