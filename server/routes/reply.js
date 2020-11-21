const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Community } = require('../models/Community');
const { Reply } = require('../models/Reply');

//=================================
//             reply
//=================================

router.post('/', (req, res) => {
    //db에 넣기
    const reply = new Reply(req.body)

    reply.save((err) => {
        if (err) {
            return res.status(400).json({success: false, err})
        } else {
            return res.status(200).json({success: true})
        }
    })
})

router.post('/replys', (req, res) => {
    console.log("replys")
    let postId = req.body.postid
    
    let findArgs = {};
    
    Reply.find(findArgs)
    .find({ "postid": { '$regex': postId }})
    .populate("writer")
    .exec((err, replyInfo) => {
        //console.log("skip", skip)
        if (err) {
            return res.status(400).json({success: false, err})
        } else {
            return res.status(200).json({
                success: true, replyInfo,
                replySize: replyInfo.length
            })
        }
    }) 
})

module.exports = router;
