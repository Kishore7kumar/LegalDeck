import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});

const lawyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    availableSlots: [slotSchema], // Embedding slot schema
    documents: [{
        type: String // Storing file paths for uploaded documents
    }]
}, {
    timestamps: true
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

export default Lawyer;
