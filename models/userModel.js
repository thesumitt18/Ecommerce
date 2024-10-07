const { DataTypes } = require('sequelize');


//model for user table

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            unique: true,  
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,  
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user', 
        }
    });

    return User;
};