const mongoose = require('mongoose')
const GroupModel = require('./group')

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Group'
        },
        gpa: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 1 || value > 4) {
                    throw new Error('gpa must be in [1.0 : 4.0]')
                }
            }
        }
    },
    {
        timestamps: true
    }
)

// Add student to group before save
studentSchema.pre('save', async function (next) {
    const student = this
    const group = await GroupModel.findById(student.group)
    if (!group) {
        throw new Error('No group with id: ', student.group)
    }
    group.students.push(student)
    await group.save()
    next()
})

// Remove student from the group before delete
studentSchema.pre('remove', async function (next) {
    const student = this

    const group = await GroupModel.findById(student.group)
    if (group) {
        await group.deleteUser(student._id)
    }
    next()
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
