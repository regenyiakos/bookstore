module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'books',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('order_items', ['order_id'], {
      name: 'idx_order_items_order_id',
    });

    await queryInterface.addIndex('order_items', ['book_id'], {
      name: 'idx_order_items_book_id',
    });

    // Add CHECK constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE order_items
      ADD CONSTRAINT order_items_quantity_check
      CHECK (quantity > 0)
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE order_items
      ADD CONSTRAINT order_items_price_check
      CHECK (price >= 0)
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_items');
  },
};
