import mongoose from 'mongoose';

const studioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    magiclineId: {
        type: Number,
        required: true
    }
});

const Studio = mongoose.model('Studio', studioSchema);

export {
    Studio
} 