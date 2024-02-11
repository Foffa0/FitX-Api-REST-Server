const mongoose = require('mongoose')

const capacitySchema = mongoose.Schema({
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Studio'
    },
    weekday: {
        type: Number,
        required: true
    },
    values: 
        [{ start: String, end: String, capacity: Number }]
    
})

module.exports = mongoose.model('CapacityWeekday', capacitySchema)