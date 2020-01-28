
const { ErrorHandler } = require('../helpers/errorHandler')

const check = async (token) => Promise.resolve(true) // should be implemented

const decodeToken = async (req, res, next) => {
  const token = req.headers.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''))

  // check token logic
  const isAuthorized = await check(token)

  if (isAuthorized) {
    return next()
  }
  return next(new ErrorHandler(401, 'Not Authorized'))
}

const checkAuth = async (req, res, next) => await decodeToken(req, res, next)

module.exports = checkAuth
