const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // Book has many Reviews
      Book.hasMany(models.Review, {
        foreignKey: 'book_id',
        as: 'reviews',
        onDelete: 'CASCADE',
      });

      // Book has many OrderItems
      Book.hasMany(models.OrderItem, {
        foreignKey: 'book_id',
        as: 'orderItems',
        onDelete: 'SET NULL',
      });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'Title is required' },
          notEmpty: { msg: 'Title cannot be empty' },
        },
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'Author is required' },
          notEmpty: { msg: 'Author cannot be empty' },
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
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'Category is required' },
          notEmpty: { msg: 'Category cannot be empty' },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'image_url',
        validate: {
          isUrl: { msg: 'Image URL must be a valid URL' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: 'Stock cannot be negative',
          },
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Book;
};
