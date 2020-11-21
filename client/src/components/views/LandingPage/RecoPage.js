import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Collapse, Col, Card, Row} from 'antd';
import ImageSlider from '../../Utils/ImageSlider';
import { areaCont, stateCont } from './Section/Datas';

const { Panel } = Collapse;

function RecoPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    // const [Filters, setFilters] = useState({
    //     areaCon: [], 
    //     stateCon: []
    // })
    // const [SearchTerm, setSearchTerm] = useState("")
    // const [View, setView] = useState()

    useEffect(() => {

        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body)
    }, [])

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

    return (<div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="맞춤 추천" key="0">
                    <Row gutter={16}>
                         {renderCards}
                    </Row>
                </Panel>
            </Collapse>
            </div>
    )                
}

export default RecoPage