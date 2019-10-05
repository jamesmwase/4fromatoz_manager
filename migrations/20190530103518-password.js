'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('passwords', {
			id: {
				type: Sequelize.INTEGER
				, autoIncrement: true
				, allowNull: false
				, primaryKey: true
			}
			, userId: {
				type: Sequelize.INTEGER
				, allowNull: false
			}
			, password: {
				type: Sequelize.STRING
				, allowNull: false
			}
			, createdAt: {
				type: Sequelize.DATE
				, allowNull: false
			}
			, updatedAt: {
				type: Sequelize.DATE
				, allowNull: false
			}
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('passwords');
	}
};
