const LessonModel = require('../models/lesson')

class LessonController {
    getById = async (id) => await LessonModel.findOne({ _id: id })

    getAll = async () => await LessonModel.find({})

    createNew = async (group) => {
        const newGroup = new LessonModel(group)
        return await newGroup.save()
    }

    update = async (id, updates, body) => {
        const group = await LessonModel.findOne({ _id: id })
        if (!group) {
            return undefined
        }
        updates.forEach(update => group[update] = body[update])

        // findByIdAndUpdate not fire save hook on mongoose middleware!!! so use above approach!
        // https://mongoosejs.com/docs/middleware.html#types-of-middleware
        // const user = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true})

        return await group.save()
    }

    deleteById = async (id) => {
        const group = await LessonModel.findOne({ _id: id })
        return await group.remove()
    }
}

module.exports = LessonController