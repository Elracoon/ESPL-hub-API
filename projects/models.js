import { Schema , model } from 'mongoose';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectManager: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    competences: {
        type: String,
        enum: ['developpement', 'design', 'marketing', 'communciation', 'ux/ui'],
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const Project = model('projects', projectSchema);

export default Project;  