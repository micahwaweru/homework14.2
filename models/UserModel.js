const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true,
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
            }
        }
    },
    {
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName:'user'}

);

module.exports=User;
