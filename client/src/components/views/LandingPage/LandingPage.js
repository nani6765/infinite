import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Button, Col, Card, Row, Carousel, Collapse} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import ImageSlider from '../../Utils/ImageSlider';

import AreaBox from './Section/AreaBox';
import AreaBoxHardCording from './Section/AreaBoxHardCording'

import { areaContinents } from './Section/Datas';
//import { response } from 'express';

const { Panel } = Collapse;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body)
    }, [])

    const getProducts = (body) => {
        axios.post('api/product/products', body).
        then(response => {
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                    //console.log(response.data)
                } else {
                    setProducts(response.data.productInfo.slice(0, 8));
                }
                setPostSize(response.data.postSize)  
            } else {
               alert("에러처리는 귀찮아.")
            }
        })
    }

    const loadMoreHandler = () => {
        
        let skip = Skip + Limit

        let body = {
            skip : Skip,
            limit : Limit,
            loadMore : true
        }

        setSkip(skip)
        console.log(skip)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        //console.log('product', product)

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{marginBottom:"32px"}}>
                <Card cover={<ImageSlider images={product.images}/>}>
                    <Card.Meta
                        title={product.title}
                        description={product.description}
                    />
                </Card>
            </div>
        </Col>
    })

    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Infinite <SmileOutlined /></h2>
            </div>

            {/* Filter */}
            {/* Area */}
            <AreaBoxHardCording />
            {/* AreaBox list = { areaContinents } */}
            
            {/* State */}
            
            {/* Serach */}
            {/* Card */}

            <Row gutter={16}>
                {renderCards}
            </Row>
            
            {PostSize >= Limit &&
                <div style={{ textAlign: 'center', justifyContent: 'center'}}>
                    <Button type="primary" onClick={loadMoreHandler}>더보기</Button>
                </div>
            }

        </div>
    )
}

export default LandingPage