import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    projects: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'projects'
        },
        status: {
            type: String,
            enum: ['in progress', 'finish', 'candidate', 'publish'],
            default: "in progress"
        }
    }],
    status: {
        type: String,
        enum: ['company', 'association', 'student'],
        default: null
    },
    competences : {
        type: String,
        enum: ['developpement', 'design', 'marketing', 'communciation', 'ux/ui'],
        default: null
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

userSchema.index({ email: 1 }, { unique: true });

const User = model('users', userSchema);

export default User;