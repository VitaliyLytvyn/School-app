const check = async (token) => Promise.resolve(true)

const decodeToken = async (req, res, next) => {
  const token = req.headers.token || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''))

  // check token logic
  const isAuthorized = await check(token)

  if (isAuthorized) {
    return next()
  }
  return res.status(400).send('Not authorized')
}

const checkAuth = async (req, res, next) => await decodeToken(req, res, next)

module.exports = checkAuth
