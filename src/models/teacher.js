const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0) {
                    throw new Error('Age must be positive')
                }
            }
        }
    },
    {
        timestamps: true
    }
)

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher