const { Router } = require('express')
const auth = require('../middlewares/auth')

const router = new Router()

router.get('/teacher', auth, (req, res, next) => {
    res.status(200).send('Teacher responce')
})

module.exports = router