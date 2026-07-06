const mongoose = require("mongoose")
const {Schema} = require("mongoose");

const taskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
    }
    );

module.exports = mongoose.model("Task",taskSchema);