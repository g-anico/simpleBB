const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "normal"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active"
        }
    });

    User.associate = models => {
        User.hasMany(models.Post, {});
    }

    User.associate = models => {
        User.hasMany(models.Forum, {});
    }

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
    });

    return User;
}
