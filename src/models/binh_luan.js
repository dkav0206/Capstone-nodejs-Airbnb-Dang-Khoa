const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return binh_luan.init(sequelize, DataTypes);
}

class binh_luan extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'nguoi_dung',
        key: 'nguoi_dung_id'
      }
    },
    hinh_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hinh_anh',
        key: 'hinh_id'
      }
    },
    ngay_binh_luan: {
      type: DataTypes.DATE,
      allowNull: true
    },
    noi_dung: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'binh_luan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
          { name: "hinh_id" },
        ]
      },
      {
        name: "hinh_binh_luan",
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
    ]
  });
  }
}
