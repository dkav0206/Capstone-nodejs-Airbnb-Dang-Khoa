const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ViTri.init(sequelize, DataTypes);
}

class ViTri extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_vi_tri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tinh_thanh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quoc_gia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ViTri',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
