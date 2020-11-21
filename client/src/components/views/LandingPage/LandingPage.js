import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Button, Col, Card, Row, Carousel, Collapse} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import ImageSlider from '../../Utils/ImageSlider';
import { areaCont, stateCont } from './Section/Datas';
import AreaBox from './Section/AreaBox';
import StateBox from './Section/StateBox';
import SearchFeatures from './Section/SearchFeatures'
import ChannelService from './Section/ChannelService'

function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        areaCon: [], 
        stateCon: []
    })
    const [SearchTerm, setSearchTerm] = useState("")
    const [View, setView] = useState()

    //초기에 최근 8개의 게시글만 보여줌. skip에 8 저장되어 있음
    useEffect(() => {

        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body)
    }, [])

    //채널 톡 고유키, 로그인 하지 않아도 이용할 수 있도록 설정
    ChannelService.boot({
        "pluginKey": "93635d68-761c-4d5a-8cde-d63b06cf017c" 
    });
    // 채널톡 닫음
    //ChannelService.shutdown();

    // 프로덕트 정보 불러오기. slice(0, 8)은 당연히 skip이랑 연계되겠죠?
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

    //더보기 버튼을 클릭했을 때, skip은 8부터 다음 8개의 게시글을 가져옴
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
        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{marginBottom:"32px"}}>
                {/*카드를 가져오면서 cover에 product로 갈 수 있도록 링크*/}
                <Card
                    cover={<a href={`/product/${product._id}`} >
                    <ImageSlider images={product.images} /></a>}
                >
                    {/*현재는 디버그 때문에 description 필터 임의지정, 나중에 수정하면 됨*/}
                    <Card.Meta
                        title={product.title}
                        description = {areaCont[product.areaCon-1].name + " | " + stateCont[product.stateCon-1].name} 
                        style={{marginBottom:'5px'}}
                />
                </Card>
            </div>
        </Col>
    })

    //필터 정보를 db에 넣어서 선택해서 게시글을 끌고올 수 있도록 수정
    const showFilterResults = (filters) => {
        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }
        getProducts(body)
        setSkip(0)
    }

    //지역 필터
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

    //나이 필터
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        if(category === "stateCon"){
            let stateConValues = hanldeStateCon(filters)
            newFilters[category] = stateConValues
        } 

        showFilterResults(newFilters)
        setFilters(newFilters)
    }

    //검색 필터
    const UpdateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
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
            <div style={{display:'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                <SearchFeatures
                    refreshFunction={UpdateSearchTerm}
                />
            </div>

            {/* Card */}
            <Row gutter={16}>
                
                    {renderCards}
                
            </Row>
            
            {PostSize >= Limit &&
                <div style={{ textAlign: 'center', justifyContent: 'center'}}>
                    <Button type="primary" onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
            
        {/* Chatbot */}
 
        </div>
    )
}

export default LandingPage