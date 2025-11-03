module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.addIndex('books', ['category'], {
      name: 'idx_books_category',
    });

    await queryInterface.addIndex('books', ['author'], {
      name: 'idx_books_author',
    });

    await queryInterface.addIndex('books', ['price'], {
      name: 'idx_books_price',
    });

    await queryInterface.addIndex('books', ['created_at'], {
      name: 'idx_books_created_at',
      order: 'DESC',
    });

    // Add CHECK constraints
    await queryInterface.sequelize.query(`
      ALTER TABLE books
      ADD CONSTRAINT books_price_check
      CHECK (price >= 0)
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE books
      ADD CONSTRAINT books_stock_check
      CHECK (stock >= 0)
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  },
};
