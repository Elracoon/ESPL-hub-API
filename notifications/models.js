const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schela({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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

const Notifiactions = mongoose.model('notifications', notificationsSchema);

module.exports = Notifiactions;