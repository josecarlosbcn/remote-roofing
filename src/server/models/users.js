module.exports = (sequelize, DataType) => {
    const UserModel = sequelize.define("user", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            isEmail: {
                msg: "The format of the e-mail is not correct"
            },
            validate: {
                notNull: {
                    msg: "E-mail cannot be empty"
                }
            }
        },
        name: {
            type: DataType.STRING,
            is: /^[a-zA-Z ]+$/i,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name cannot be empty"
                }
            }
        },
        surname: {
            type: DataType.STRING,
            is: /^[a-zA-Z ]+$/i,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Surname cannot be empty"
                }
            }
        }
    });
    UserModel.associate = (models) => {
        UserModel.hasMany(models.project, {
            foreignKey: "userID"
        })
    }

    return UserModel;    
};