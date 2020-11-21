const express = require('express');
const router = express.Router();
const multer = require('multer');
const { default: ProductImage } = require('../../client/src/components/views/ProductDetail/Section/ProductImage');
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

//메인페이지에 프로덕트 뿌려주는 곳이 이곳
router.post('/products', (req, res) => {
    //limit이랑 skip을 20과 0으로 초기화하긴 하는데 어차피 프론트에서 넘겨줘서 숫자는 의미없음
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
        //.find({ $text: { $search: term }}) 영어밖에 검색이 안된다...
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

        if (type === "array") {
            let ids = req.query.id.split(',')
            productId = ids.map(item => {
                return item
            })
    
        }

        Product.find({ _id: { $in: productId } })
            .populate('writer')
            .exec((err, product) => {
                if (err) return res.status(400).send(err)
                return res.status(200).send(product)
            })
        })

    /*
    router.get('/test', (req, res) =>{

        let type = req.query.type
        let productId = req.query.id

        if (type === "array") {
            let ids = req.query.id.split(',')
            productId = ids.map(item => {
                return item
            })
    
        }
    */
        /*
        Product.findOneAndUpdate(
            { _id: { $in: productId } },
            (err, product) => {
                if (err) return res.json({ success: false, err })

                const products = new products(transactionData)
                product.save((err, doc) => {
                    if (err) return res.json({ success: false, err })
    
                    async.eachSeries(product, (item, callback) => {
    
                        Product.update(
                            { _id: item.id },
                            {
                                $inc: {
                                    "view": 1
                                }
                            },
                            { new: false },
                            callback
                        )
                    }, (err) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).json({
                            success: true,
                        })
                        }
                    )
                })
                 
            })
           
    })
    */
})

module.exports = router;
