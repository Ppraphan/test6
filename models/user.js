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
    },
    lastname: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING
    },
    telNumber: {
      type: Sequelize.STRING
    },
    fristDayJoin: {
      type: Sequelize.STRING
    },
    dayLeft: {
      type: Sequelize.STRING,
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
