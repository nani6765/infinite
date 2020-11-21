import React, { useState } from 'react'
import {Button, Form, Input} from 'antd';
import Axios from 'axios';

const { TextArea } = Input;

function CoReply(props) {
    console.log("postId is", props.postId)
    const [Description, setDescription] = useState("")
    const [Postid, setPostid] = useState(props.postId)

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        //event.preventDefault();
        if(!Description ){
            return alert("내용을 채워주세요.")
        }
        else{
            console.log("Check")
        }
        //server value request

        const body = {
            writer: props.data.user.userData._id,
            postid: Postid,
            description: Description,
        }

        Axios.post("/api/reply", body)
            .then(response => {
                if(response.data.success){
                    alert('댓글이 저장되었습니다.')
                    window.location.reload();
                    //props.history.push(`{/community/${props.postId}}`)
                }
                else{
                    alert('저장 실패')
                }
            })
        }
            
    return (
        <Form onFinish={submitHandler}>
            <TextArea onChange={descriptionChangeHandler} value={Description}/>
            <br/>
            <br/>
            <Button htmlType="submit"> 등록 </Button>
        </Form>
    )
}

export default CoReply
