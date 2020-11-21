import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { Button } from 'antd';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {

        if (props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    function handleClick(e) {
        e.preventDefault();
        alert('구현중입니다.');
      }

    return (
        <div>
            <ImageGallery items={Images} />
            <br/>
            <br/>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" style={{marginRight:'20px'}}
                onClick={handleClick} >
                    관심등록
                </Button>

                <Button size="large" shape="round" type="danger" onClick={handleClick} >
                    지원하기
                </Button>
            </div>
        </div>
    )
}

export default ProductImage