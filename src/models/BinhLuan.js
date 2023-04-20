const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return BinhLuan.init(sequelize, DataTypes);
}

class BinhLuan extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Phong',
        key: 'id'
      }
    },
    ma_nguoi_binh_luan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'NguoiDung',
        key: 'id'
      }
    },
    ngay_binh_luan: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    noi_dung: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sao_binh_luan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BinhLuan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "ma_phong" },
          { name: "ma_nguoi_binh_luan" },
          { name: "ngay_binh_luan" },
        ]
      },
      {
        name: "Binh_luan_Phong",
        using: "BTREE",
        fields: [
          { name: "ma_phong" },
        ]
      },
      {
        name: "ma_nguoi_binh_luan",
        using: "BTREE",
        fields: [
          { name: "ma_nguoi_binh_luan" },
        ]
      },
    ]
  });
  }
}
