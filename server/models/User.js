const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const { text } = require('body-parser');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 1
    },
    lastname: {
        type:String,
        maxlength: 50
    },

    role : {
        type:Number,
        default: 0 
    },
    
    image: String,

    //관심분야
    interested: {
        type:Array,
    },
    
    //지원계열
    line: {
        type:String,
        minglength: 1
    },

    //대학명
    school: {
        type:String,
        minglength: 1
    },
    
    //학적정보
    academic: {
        type:String,
        minglength: 1
    },

    //성적정보
    achievement: {
        type:Number,
        default: 0,
        step: "0.01"
    },
    
    //소득분위
    income: {
        type:Number,
        default: 0 
    },

    //특수정보
    info: {
        type:Array,
    },

    //담은 상품
    products: {
        type:Array,
    },

    token : {
        type: String,
    },

    tokenExp :{
        type: Number
    }
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }