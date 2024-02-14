import mongoose from 'mongoose';

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
        [{ start: String, end: String, capacities: []}]
    
});

const WeekdayCapacityModel = mongoose.model('CapacityWeekday', capacitySchema);

export {
    WeekdayCapacityModel
}