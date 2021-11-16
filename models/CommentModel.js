const { Model, DataTypes } = require('sequelize');
const sequelize=require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
        },
        body:{
            type:DataTypes.STRING,
            allowNull:false,
        },

    },
    {
        sequelize,
        freezeTableName:true,
        modelName:'Comment',
    }
);

module.exports=Comment;