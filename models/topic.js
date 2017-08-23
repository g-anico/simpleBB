module.exports = (sequelize, DataTypes) => {
    let Topic = sequelize.define("Topic", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });

    Topic.associate = models => {
        Topic.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    Topic.associate = models => {
        Topic.belongsTo(models.Forum, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Topic.associate = models => {
        Topic.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Topic
}
