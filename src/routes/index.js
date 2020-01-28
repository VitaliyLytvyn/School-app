const { Router } = require('express')
const teacherRoutes = require('./teacher')

const router = new Router()

router.use('/', teacherRoutes)

module.exports = router