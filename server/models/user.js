/** @description User database model with foreign keys and associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} User model
 */
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full name is require'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'Full name must only contain letters'
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        len: {
          args: [3, 25],
          msg: 'Username must be atleast 3 to 3 to 25 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid Email'
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

      User.associate = (models) => {
        // associations can be defined here
        User.hasMany(models.Business, {
          foreignKey: 'userId',
          as: 'business'
        });
        User.hasMany(models.Reviews, {
          foreignKey: 'userId',
          as: 'reviews'
        });
      };

  return User;
};