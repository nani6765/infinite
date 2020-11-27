import React, { useEffect, useState, useCallback } from 'react'
import { Button } from 'antd';
import axios from 'axios';

function ProductButton(props) {

    function handleApply(e) {
        e.preventDefault();
        alert('구현중입니다.');
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" style={{marginRight:'20px'}}
                onClick={handleApply} >
                    관심등록
                </Button>
                <Button size="large" shape="round" type="danger" onClick={handleApply}>
                    <a href>지원하기</a>
                </Button>
            </div>
        </div>
    )
}

export default ProductButton
