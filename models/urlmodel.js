const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    viewClickedHistory: [{}],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    { timestamps: true }
);

const URL = mongoose.model("url2", urlSchema);

module.exports = URL