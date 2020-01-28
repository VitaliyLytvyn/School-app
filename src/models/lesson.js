const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Teacher'
        }
        
    },
    {
        timestamps: true
    }
)

const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson