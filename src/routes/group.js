const { Router } = require('express')
const auth = require('../middlewares/auth')
const GroupController = require('../controllers/group')

const router = new Router()
const groupController = new GroupController()

router.get('/group/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const group = await groupController.getById(id)
        res.status(200).send(group)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/groups', auth, async (req, res, next) => {
    const groups = await groupController.getAll()
    res.status(200).send(groups)
})

router.post('/group', auth, async (req, res, next) => {
    try {
        const group = await groupController.createNew(req.body)
        res.status(201).send({ group })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/group/:id', auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const group = await groupController.deleteById(id)
        if (!group) {
            return res.status(404).send()
        }
        res.status(200).send(group)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/group/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['groupNumber']
    const isvalid = updates.every((update) => allowed.includes(update))
    if (!isvalid) {
        res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const group = await groupController.update(req.params.id, updates, req.body)
        if (!group) {
            return res.status(404).send()
        }
        res.send(group)
    } catch (err) {
        res.status(400).send()
    }
})

module.exports = router