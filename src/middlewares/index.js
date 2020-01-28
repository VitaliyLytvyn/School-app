const bodyParser = require('body-parser')
const { expressLogger } = require('../helpers/logger')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  if (!process.env.NODE_ENV !== 'production') {
    app.use(expressLogger)
  }
}
