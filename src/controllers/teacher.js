const TeacherModel = require('../models/teacher')

class TeacherController {
    getById = async (id) => await TeacherModel.findOne({ _id: id })

    getAll = async () => await TeacherModel.find({})

    createNew = async (teacher) => {
        const newTeacher = new TeacherModel(teacher)
        return await newTeacher.save()
    }

    update = async (id, updates, body) => {
        const teacher = await TeacherModel.findOne({ _id: id })
        if (!teacher) {
            return undefined
        }
        updates.forEach(update => teacher[update] = body[update])

        // findByIdAndUpdate not fire save hook on mongoose middleware!!! so use above approach!
        // https://mongoosejs.com/docs/middleware.html#types-of-middleware
        // const user = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true})

        return await teacher.save()
    }

    deleteById = async (id) => await TeacherModel.findByIdAndDelete(id)
}

module.exports = TeacherController
