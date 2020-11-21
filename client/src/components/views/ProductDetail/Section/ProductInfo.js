import React from 'react'
import { Descriptions } from 'antd';
//import { useDispatch } from 'react-redux';

function ProductInfo(props) {

    let detail = props.detail.description

    return (
        <div>
            <Descriptions title="장학정보">
                <Descriptions.Item>
                    <span style={{whiteSpace:'pre-line', textAlign:'left'}}>
                        {detail}
                    </span>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ProductInfo