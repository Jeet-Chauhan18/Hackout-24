const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: Number,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const repoSchema = new mongoose.Schema({
    name: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    files: [fileSchema]  // Array of files associated with the repo
});

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
