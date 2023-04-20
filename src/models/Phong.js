const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Phong.init(sequelize, DataTypes);
}

class Phong extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_phong: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    khach: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_ngu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    giuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_tam: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mo_ta: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gia_tien: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    may_giat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    ban_la: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    tivi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    dieu_hoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    bep: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    do_xe: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    ho_boi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    ban_ui: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "0"
    },
    ma_vi_tri: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
      references: {
        model: 'ViTri',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Phong',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "ma_vi_tri" },
        ]
      },
      {
        name: "ma_vi_tri",
        using: "BTREE",
        fields: [
          { name: "ma_vi_tri" },
        ]
      },
    ]
  });
  }
}
