module.exports = (sequelize, DataTypes) => {
    let Topic = sequelize.define("Topic", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active"
        },
        latestPost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Topic.associate = models => {
        Topic.hasMany(models.Post, {
            onDelete: "cascade"
        });

        Topic.belongsTo(models.Forum, {
            foreignKey: {
                allowNull: false
            }
        });

        Topic.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Topic
}
