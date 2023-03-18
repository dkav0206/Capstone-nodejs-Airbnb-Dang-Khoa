const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return luu_anh.init(sequelize, DataTypes);
}

class luu_anh extends Sequelize.Model {
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
    ngay_luu: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'luu_anh',
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
        name: "hinh_luu_anh",
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
    ]
  });
  }
}
