const StudentModel = require('../models/student')

class StudentController {
    getById = async (id) => await StudentModel.findOne({ _id: id })

    getAll = async () => await StudentModel.find({})

    createNew = async (student) => {
        const newStudent = new StudentModel(student)
        return await newStudent.save()
    }

    update = async (id, updates, body) => {
        const student = await StudentModel.findOne({ _id: id })
        if (!student) {
            return undefined
        }
        updates.forEach(update => student[update] = body[update])

        // findByIdAndUpdate not fire save hook on mongoose middleware!!! so use above approach!
        // https://mongoosejs.com/docs/middleware.html#types-of-middleware
        // const user = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true})

        return await student.save()
    }

    deleteById = async (id) => {
        const student = await StudentModel.findOne({ _id: id })
        return await student.remove()
    }
}

module.exports = StudentController