import { Schema, model } from 'mongoose';

const notificationsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})

const Notifiactions = model('notifications', notificationsSchema);

export default Notifiactions;