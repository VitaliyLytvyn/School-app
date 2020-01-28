const TeacherModel = require('../models/teacher')

class TeacherController {
    getById = async (id) => await TeacherModel.findOne({ _id: id })

    getAll = async () => await TeacherModel.find({})

    createNew = async (teacher) => {
        const newTeacher = new TeacherModel(teacher)
        return await newTeacher.save()
    }

    deleteById = async (id) => await TeacherModel.findByIdAndDelete(id)
}

module.exports = TeacherController
