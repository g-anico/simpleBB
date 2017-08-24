module.exports = (sequelize, DataTypes) => {
    let Forum = sequelize.define("Forum", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        description: {
            type: DataTypes.TEXT("tiny"),
            allowNull: false,
        }
    });

    Forum.associate = models => {
        Forum.hasMany(models.Topic, {});
        Forum.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Forum;
}
