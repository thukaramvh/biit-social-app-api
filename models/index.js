const { Sequelize } = require('sequelize')
const { db } = require('../config')

const { dialect, host, port, username, password, database } = db

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

const models = {}

models.Friendship = require('./friendship')(sequelize)
models.GroupUser = require('./group-user')(sequelize)
models.User = require('./user')(sequelize)
models.Student = require('./student')(sequelize)
models.Teacher = require('./teacher')(sequelize)
models.Group = require('./group')(sequelize)
models.Post = require('./post')(sequelize)
models.Like = require('./like')(sequelize)
models.Comment = require('./comment')(sequelize)
models.Media = require('./media')(sequelize)
models.Course = require('./course')(sequelize)
models.Wall = require('./wall')(sequelize)

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

sequelize
  // .sync({ force: true })
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
