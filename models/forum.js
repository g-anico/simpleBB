module.exports = (sequelize, DataTypes) => {
    let Forum = sequelize.define("Forum", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    });

    Forum.associate = models => {
        Forum.hasMany(models.Topic, {
            onDelete: "cascade"
        });
    };

    Forum.associate = models => {
        Forum.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Forum;
}
