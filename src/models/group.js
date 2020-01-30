const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema(
    {
        groupNumber: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('GroupNumber must be positive')
                }
            }
        },

        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'Student'
            }
        ]

    },
    {
        timestamps: true
    }
)

groupSchema.methods.deleteUser = async function (userId) {
    const group = this
    group.students = group.students.filter(value => value.toString() !== userId.toString())
    return await group.save()
}

const Group = mongoose.model('Group', groupSchema)
module.exports = Group