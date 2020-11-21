import React from 'react'
import { Descriptions } from 'antd';
//import { useDispatch } from 'react-redux';

function ProductInfo(props) {

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ProductInfo