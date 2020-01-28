const { Router } = require('express')
const auth = require('../middlewares/auth')
const TeacherController = require('../controllers/teacher')

const router = new Router()
const teacherController = new TeacherController()

router.get('/teacher/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const teacher = await teacherController.getById(id)
        res.status(200).send(teacher)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/teachers', auth, async (req, res, next) => {
    const teachers = await teacherController.getAll()
    res.status(200).send(teachers)
})

router.post('/teacher', auth, async (req, res, next) => {
    try {
        const teacher = await teacherController.createNew(req.body)
        res.status(201).send({ teacher })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/teacher/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const teacher = await teacherController.deleteById(id)
        if (!teacher) {
            return res.status(404).send()
        }
        res.status(200).send(teacher)
    } catch (err) {
        res.status(500).send(err)
    }
})




module.exports = router