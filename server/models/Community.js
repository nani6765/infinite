const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = mongoose.Schema({
    
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
},{timestamps:true})

const Community = mongoose.model('Community', communitySchema);

module.exports = { Community }    