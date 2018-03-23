/** @description User database model with foreign keys and associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Business model
 */
export default (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business name is required'
        },
        is: {
          args: /^[a-z ]+$/i,
          msg: 'Business name must only contain letters'
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
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aboutUs: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
      Business.associate = (models) => {
        // associations can be defined here
        Business.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Business.hasMany(models.Reviews, {
          foreignKey: 'businessId'
        });
      };

  return Business;
};