const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Community } = require('../models/Community');
const { Reply } = require('../models/Reply');

//=================================
//             community
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일 저장 위치
        cb(null, 'uploads/community/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

router.post('/', (req, res) => {
    //db에 넣기
    const community = new Community(req.body)

    community.save((err) => {
        if (err) {
            return res.status(400).json({success: false, err})
        } else {
            return res.status(200).json({success: true})
        }
    })
})

/*
router.post('/reply', (req, res) => {
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
*/

router.post('/posts', (req, res) => {
    let term = req.body.searchTerm
    
    let findArgs = {};
    
    for(let key in req.body.filters){
        //console.log(req.body.filters[key].length)
            if(req.body.filters[key].length > 0){
                findArgs[key] = req.body.filters[key];
            }
        }

    if(term){
        Community.find(findArgs)
        .find({ "title": { '$regex': term }})
        //.find({ $text: { $search: term }}) 영어밖에 검색이 안된다...
        .populate("writer")
        .exec((err, postInfo) => {
            //console.log("skip", skip)
            if (err) {
                return res.status(400).json({success: false, err})
            } else {
                return res.status(200).json({
                    success: true, postInfo,
                    postSize: postInfo.length
                })
            }
        })
    } else {
        Community.find(findArgs)
        .populate("writer")
        .exec((err, postInfo) => {
            //console.log("skip", skip)
            if (err) {
                return res.status(400).json({success: false, err})
            } else {
                return res.status(200).json({
                    success: true, postInfo,
                    postSize: postInfo.length
                })
            }
        })} 
        
    router.get('/post_by_id', (req, res) => {

        let type = req.query.type
        let postId = req.query.id
        
        if (type === "array") {
            let ids = req.query.id.split(',')
            postId = ids.map(item => {
                return item
            })
    
        }

        Community.find({ _id: { $in: postId } })
            .populate('writer')
            .exec((err, post) => {
                if (err) return res.status(400).send(err)
                return res.status(200).send(post)
            })
        })
})

/*
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
*/
module.exports = router;
