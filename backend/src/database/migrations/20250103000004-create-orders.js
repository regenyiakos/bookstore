module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('orders', ['user_id'], {
      name: 'idx_orders_user_id',
    });

    await queryInterface.addIndex('orders', ['status'], {
      name: 'idx_orders_status',
    });

    await queryInterface.addIndex('orders', ['created_at'], {
      name: 'idx_orders_created_at',
      order: 'DESC',
    });

    // Add CHECK constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      ADD CONSTRAINT orders_total_price_check
      CHECK (total_price >= 0)
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      ADD CONSTRAINT orders_status_check
      CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
