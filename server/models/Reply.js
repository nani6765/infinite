const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postid: {
        type: String,
    },
    description: {
        type: String,
    },
    test: {
        type: String,
    }
},{timestamps:true})

const Reply = mongoose.model('Reply', replySchema);

module.exports = { Reply }    