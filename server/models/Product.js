const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    
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
    images: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    areaCon: {
        type: Number,
        default: 1
    },
    stateCon: {
        type: Number,
        default: 1
    },
    
},{timestamps:true})

//검색설정
productSchema.index({
    title: 'text',
    description: 'text',
    writer: 'Schema.Types.ObjectId'
}, {
    weights: {
        title: 5,
        description: 5,
        writer: 5,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }    