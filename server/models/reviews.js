/** @description Review database model with foreign keys and associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Review model
 */
export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewDetail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business review for is required'
        },
        len: {
          args: [4, undefined],
          msg: 'Review provided must be atleast 4 characters'
        }
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
      Reviews.associate = (models) => {
        // associations can be defined here
        Reviews.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Reviews.belongsTo(models.Business, {
          foreignKey: 'businessId',
          onDelete: 'CASCADE'
        });
      };

  return Reviews;
};