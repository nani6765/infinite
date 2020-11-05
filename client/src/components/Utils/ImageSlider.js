import React from 'react'
import {Button, Col, Card, Row, Carousel} from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <div>
                <Carousel autoplay>
                    <img style={{width:'100%', height:'150px', minHeight:'150px', maxHeight:'150px'}}
                        src={`http://localhost:5000/${props.images[0]}`} /> 
                    {/*
                        {props.images.map((image, index) => (
                            <div key={index}>
                                <img style={{width:'100%', height:'150px', minHeight:'150px', maxHeight:'150px'}}
                                    src={`http://localhost:5000/${image}`} />
                            </div>    
                        ) )}
                    */}
                </Carousel>
            </div>
        </div>
    )
}

export default ImageSlider
