const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true,
            trim: true
        },

        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Teacher'
        },

        group: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Group'
        },

        room: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw new Error('RoomNumber must be positive')
                }
            }
        },
        schedulePosition: {
            type: Number,
            required: true,
            validate(value) {
                if (value < 1 || value > 10) {
                    throw new Error('Schedule Posution can only be in range [1 : 10]')
                }
            }
        },

    },
    {
        timestamps: true
    }
)

// make constraint - no several lessons at same time in same room 
lessonSchema.index({ room: 1, schedulePosition: 1 }, { unique: true })

const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson