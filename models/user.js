module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userPermission: {
      type: Sequelize.STRING,
    },
    nameIDHuman: {
      type: Sequelize.INTEGER
    },
    nameIDReseacher: {
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    engFirstName: {
      type: Sequelize.STRING,      
    },
    engLastName: {
      type: Sequelize.STRING,
    },
    prefix: {
      type: Sequelize.STRING,
    },
    academicPositions: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATE
    },
    telNumber: {
      type: Sequelize.STRING
    },
    fristDayJoin: {
      type: Sequelize.DATE
    },
    dayLeft: {
      type: Sequelize.DATE
    },
    username: {
      type: Sequelize.TEXT
    },
    about: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_login: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    country: {
      type: Sequelize.INTEGER
    },
    university: {
      type: Sequelize.INTEGER
    },
    faculty: {
      type: Sequelize.INTEGER
    },
    department: {
      type: Sequelize.INTEGER
    },
    subdepartment: {
      type: Sequelize.INTEGER
    },
    profilePic: {
      type: Sequelize.TEXT
    },

  });

  return User;

}
