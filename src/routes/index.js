const { Router } = require('express')
const teacherRoutes = require('./teacher')
const studentRoutes = require('./student')
const groupRoutes = require('./group')

const router = new Router()

router.use('/', teacherRoutes)
router.use('/', studentRoutes)
router.use('/', groupRoutes)

module.exports = router