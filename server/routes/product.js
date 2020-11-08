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
        if (err) {
            return res.status(400).json({success: false, err})
        } else {
            return res.status(200).json({success: true})
        }
    })
})

router.post('/products', (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm
    
    let findArgs = {};
    
    for(let key in req.body.filters){
    //console.log(req.body.filters[key].length)
        if(req.body.filters[key].length > 0){
            findArgs[key] = req.body.filters[key];
        }
    }
    
    if(term){
        Product.find(findArgs)
        .find({ "title": { '$regex': term }})
        //.find({ $text: { $search: term }})
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            //console.log("skip", skip)
            if (err) {
                return res.status(400).json({success: false, err})
            } else {
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            }
        })
    } else {
        Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            //console.log("skip", skip)
            if (err) {
                return res.status(400).json({success: false, err})
            } else {
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            }
        })
    }

    router.get('/products_by_id', (req, res) => {

        let type = req.query.type
        let productId = req.query.id
        console.log("productId", productId)
        
        if (type === "array") {
            let ids = req.query.id.split(',')
            productId = ids.map(item => {
                return item
            })
    
        }
    
        Product.find({ _id: { $in: productId } })
            .populate('writer')
            .exec((err, product) => {
                console.log(product)
                if (err) return res.status(400).send(err)
                return res.status(200).send(product)
            })
        })

})

module.exports = router;
