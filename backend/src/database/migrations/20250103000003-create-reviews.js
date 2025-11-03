module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // Add unique constraint for user_id and book_id
    await queryInterface.addConstraint('reviews', {
      fields: ['user_id', 'book_id'],
      type: 'unique',
      name: 'reviews_user_id_book_id_key',
    });

    // Add indexes
    await queryInterface.addIndex('reviews', ['book_id'], {
      name: 'idx_reviews_book_id',
    });

    await queryInterface.addIndex('reviews', ['user_id'], {
      name: 'idx_reviews_user_id',
    });

    await queryInterface.addIndex('reviews', ['rating'], {
      name: 'idx_reviews_rating',
    });

    // Add CHECK constraint for rating
    await queryInterface.sequelize.query(`
      ALTER TABLE reviews
      ADD CONSTRAINT reviews_rating_check
      CHECK (rating >= 1 AND rating <= 5)
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  },
};
