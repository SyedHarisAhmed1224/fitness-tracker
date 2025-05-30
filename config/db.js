const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your MySQL credentials
const sequelize = new Sequelize('TEMP', 'root', 'haris', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Set true if you want SQL queries logged
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('MySQL Connected');
    })
    .catch(err => {
        console.error('MySQL connection error:', err);
    });

module.exports = sequelize;
