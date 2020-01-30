const GroupModel = require('../models/group')
const StudentModel = require('../models/student')

class GroupController {
    getById = async (id) => await GroupModel.findOne({ _id: id })

    getAll = async () => await GroupModel.find({})

    createNew = async (group) => {
        const newGroup = new GroupModel(group)
        return await newGroup.save()
    }

    update = async (id, updates, body) => {
        const group = await GroupModel.findOne({ _id: id })
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
        const group = await GroupModel.findOne({ _id: id })

        // remove also all Students of the group
        await StudentModel.remove({ _id: { $in: group.students } })

        return await group.remove()
    }
}

module.exports = GroupController