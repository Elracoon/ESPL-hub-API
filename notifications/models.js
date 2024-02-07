import { Schema, model } from 'mongoose';

const notificationsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    types: {
        type: String,
        enum: ['accepted', 'new feedback', 'new candidate', 'refused', 'pending'],
        required: false,
        default: 'pending'
    },
})

const Notifiaction = model('notifications', notificationsSchema);

export default Notifiaction;