const bcrypt = require("bcrypt-nodejs");

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
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active"
        }
    });

    User.associate = models => {
        User.hasMany(models.Post, {});
        User.hasMany(models.Topic, {});
    };


    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12), null);
    });

    return User;
}
