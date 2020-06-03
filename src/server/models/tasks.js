module.exports = (sequelize, DataType) => {
    const TaskModel =  sequelize.define("task", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        description: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Description cannot be empty"
                }
            }
        },
        score: {
            type: DataType.INTEGER,
            allowNull: false,
            isNumeric: true,
            validate: {
                notNull: {
                    msg: "Score cannot be empty"
                },
                isInt: {
                    msg: "The score must be an integer value"
                }
            }
        },
        status: {
            type: DataType.ENUM("active", "inactive", "declined", "completed"),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Status cannot be empty"
                },
                isIn: {
                    args: [["active", "inactive", "declined", "completed"]],
                    msg: "The values allowed for status are ('active', 'inactive', 'declined', 'completed')"
                }
            }
        },
        userID: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "userID cannot be null"
                }
            },
            references: {
                model: "users",
                key: "id"
            }            
        },
        projectID: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "projectID cannot be null"
                }
            }
        }
    }); 
    TaskModel.associate = (models) => {
        TaskModel.belongsTo(models.user, {
            foreignKey: "userID"
        });
        TaskModel.belongsTo(models.project, {
            foreignKey: "projectID"
        })
    }

    return TaskModel;
}