import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Button, Col, Card, Row, Carousel} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import ImageSlider from '../../Utils/ImageSlider'

//import { response } from 'express';

function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {
        axios.post('api/product/products').
            then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setProducts(response.data.productInfo)
                }else{
                   alert("에러처리는 귀찮아.")
                }
            })
    }, [])

    const renderCards = Products.map((product, index) => {
        //console.log('product', product)

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card cover={<ImageSlider images={product.images}/>}>
                <Card.Meta
                    title={product.title}
                    description={product.description}
                />
            </Card>
        </Col>
    })

    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Infinite <SmileOutlined /></h2>
            </div>

            {/* Filter */}
            {/* Serach */}
            {/* Card */}

            <Row gutter={16, 16}>
                {renderCards}
            </Row>
            
            <div style={{ display:'flex', justifyContent: 'center'}}>
                <Button>더보기</Button>
            </div>
        </div>
    )
}

export default LandingPage