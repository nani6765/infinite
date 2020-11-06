import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Button, Col, Card, Row, Carousel, Collapse} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import ImageSlider from '../../Utils/ImageSlider';
import { areaCont, stateCont } from './Section/Datas';
import AreaBox from './Section/AreaBox';
import StateBox from './Section/StateBox';
//import { response } from 'express';

const { Panel } = Collapse;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        areaCon: [], 
        stateCon: []
    })

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
            skip : skip,
            limit : Limit,
            loadMore : true
        }

        setSkip(skip)
        console.log("skip", skip)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        //console.log('product', product)
        let path = "/productdetail/"+`${product._id}`
        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{marginBottom:"32px"}}>
                <a href={path}>
                    <Card cover={<ImageSlider images={product.images}/>}>
                    <Card.Meta
                        title={product.title}
                        description = {areaCont[product.areaCon-1].name + " | " + stateCont[product.stateCon-1].name} 
                        style={{marginBottom:'5px'}}
                    />
                    </Card>
                </a>
            </div>
        </Col>
    })

    const showFilterResults = (filters) => {
        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }
        getProducts(body)
        setSkip(0)
    }

    const hanldeStateCon = (value) => {
        const data = stateCont;

        let array = [];
        for (let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        //console.log(array)
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        if(category === "stateCon"){
            let stateConValues = hanldeStateCon(filters)
            newFilters[category] = stateConValues
        } 

        showFilterResults(newFilters)
    }

    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Infinite <SmileOutlined /></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* Area */}
                    <AreaBox list={areaCont} handleFilters={filters => handleFilters(filters, "areaCon")}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* State */}
                    <StateBox list={stateCont} handleFilters={filters => handleFilters(filters, "stateCon")}/>
                </Col>
            </Row>
            
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