const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    projects: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        },
        enum: ['in progress', 'finish', 'candidate', 'publish']
    }],
    status: {
        type: String,
        enum: ['entreprise', 'association', 'student'],
        default: null,
        required: true
    },
    competences : {
        type: String,
        enum: ['developpement', 'design', 'marketing', 'communciation', 'ux/ui'],
        default: null,
        required: true
    },
    entreprise : {
        name: String,
        website: String,
        address: String,
        postalCode: Number,
        city: String,
        number: Number,
        industrySector: String,
        logo: String
    },
    school: {
        name: String,
        website: String,
        address: String,
        postalCode: Number,
        city: String,
        number: Number,
        industrySector: String,
        logo: String,
        education: String
    },
    association: {
        name: String,
        website: String,
        city: String,
        number: Number,
        logo: String,
        description: String
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;