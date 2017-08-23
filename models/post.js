module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define("Post", {
        post: {
            type: DataTypes.TEXT("medium"),
            allowNull: false
        },
        display: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    Post.associate = models => {
        Post.belongsTo(models.Topic, {
            foreignKey: {
                allowNull: false
            }
        });

        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Post;
}
