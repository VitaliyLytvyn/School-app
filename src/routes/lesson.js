const { Router } = require('express')
const auth = require('../middlewares/auth')
const LessonController = require('../controllers/lesson')

const router = new Router()
const lessonController = new LessonController()

router.get('/lesson/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const lesson = await lessonController.getById(id)
        res.status(200).send(lesson)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/lessons', auth, async (req, res, next) => {
    const lessons = await lessonController.getAll()
    res.status(200).send(lessons)
})

router.post('/lesson', auth, async (req, res, next) => {
    try {
        const lesson = await lessonController.createNew(req.body)
        res.status(201).send({ lesson })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/lesson/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const lesson = await lessonController.deleteById(id)
        if (!lesson) {
            return res.status(404).send()
        }
        res.status(200).send(lesson)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/lesson/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['topic', 'teacher', 'group', 'room', 'schedulePosition']
    const isvalid = updates.every((update) => allowed.includes(update))
    if (!isvalid) {
        res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const lesson = await lessonController.update(req.params.id, updates, req.body)
        if (!lesson) {
            return res.status(404).send()
        }
        res.send(lesson)
    } catch (err) {
        res.status(400).send()
    }
})

module.exports = router