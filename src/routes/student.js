const { Router } = require('express')
const auth = require('../middlewares/auth')
const StudentController = require('../controllers/student')

const router = new Router()
const studentController = new StudentController()

router.get('/student/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const student = await studentController.getById(id)
        res.status(200).send(student)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/students', auth, async (req, res, next) => {
    const students = await studentController.getAll()
    res.status(200).send(students)
})

router.post('/student', auth, async (req, res, next) => {
    try {
        const student = await studentController.createNew(req.body)
        res.status(201).send({ student })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/student/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const student = await studentController.deleteById(id)
        if (!student) {
            return res.status(404).send()
        }
        res.status(200).send(student)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/student/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'group', 'gpa']
    const isvalid = updates.every((update) => allowed.includes(update))
    if (!isvalid) {
        res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const student = await studentController.update(req.params.id, updates, req.body)
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (err) {
        res.status(400).send()
    }
})

module.exports = router