module.exports = (sequelize, DataTypes) => {
    let Category = sequelize.define("Category", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    });
    
    Category.associate = models => {
        Category.hasMany(models.Forum, {
            onDelete: "cascade"
        });
    }

    return Category;
}
