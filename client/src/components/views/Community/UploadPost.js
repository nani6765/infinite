import React, { useState } from 'react'
import {Typography, Button, Form, Input} from 'antd';
//import FileUpload from '../../Utils/FileUpload.js'
import Axios from 'axios';
//import { response } from 'express';

const { Title } = Typography;
const { TextArea } = Input;

function UploadPost(props) {
    
    const [PostTitle, setTitle] = useState("")
    const [Description, setDescription] = useState("")
 
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        //event.preventDefault();
        if(!PostTitle || !Description ){
            return alert("제목과 내용을 채워주세요.")
        }
        else{
            console.log("Check")
        }
        //server value request

        const body = {
            //login ID
            writer: props.user.userData._id,
            title: PostTitle,
            description: Description,
        }

        Axios.post("/api/community", body)
            .then(response => {
                if(response.data.success){
                    alert('저장 성공')
                    props.history.push('/community')
                }
                else{
                    alert('저장 실패')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom: '2rem'}}>
                <Title level='2'>글 게시하기</Title>
            </div>

            <Form onFinish={submitHandler}>
                {/*Drop Zone*/}
                <br />
                <br />
                <lavel> 제목 </lavel>
                <Input onChange={titleChangeHandler} value={PostTitle}/>
                <br />
                <br />
                <lavel> 설명 </lavel>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <Button htmlType="submit"> 제출 </Button>
            </Form>
        </div>
    )
}

export default UploadPost