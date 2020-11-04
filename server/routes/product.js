const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //파일 저장 위치
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

  
router.post('/image', (req, res) => {
    //image save
    upload(req, res, err => {
        if(err) {
            return res.json({success : false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
})
  
router.post('/', (req, res) => {
    //db에 넣기
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
})

module.exports = router;
