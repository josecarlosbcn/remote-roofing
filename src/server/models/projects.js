module.exports = (sequelize, DataType) => {
    const ProjectModel =  sequelize.define("project", {
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
        body: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Body cannot be empty"
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
                    msg: "userID cannot be empty"
                }
            },
            references: {
                model: "users",
                key: "id"
            }            
        }
    }); 
    ProjectModel.associate = (models) => {
        ProjectModel.belongsTo(models.user, {
            foreignKey: "userID"
        });
    }

    return ProjectModel;
}