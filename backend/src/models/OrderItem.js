const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class OrderItem extends Model {
    static associate(models) {
      // OrderItem belongs to Order
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order',
        onDelete: 'CASCADE',
      });

      // OrderItem belongs to Book
      OrderItem.belongsTo(models.Book, {
        foreignKey: 'book_id',
        as: 'book',
        onDelete: 'SET NULL',
      });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id',
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'book_id',
        references: {
          model: 'books',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Quantity is required' },
          min: {
            args: [1],
            msg: 'Quantity must be at least 1',
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: 'Price is required' },
          min: {
            args: [0],
            msg: 'Price cannot be negative',
          },
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return OrderItem;
};
