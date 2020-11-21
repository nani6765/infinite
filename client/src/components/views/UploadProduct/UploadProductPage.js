import React, { useState } from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../Utils/FileUpload.js'
import Axios from 'axios';
//import { response } from 'express';

const { Title } = Typography;
const { TextArea } = Input;

const areaContinents = [
    {key:1, value:"서울" },
    {key:2, value:"경기" },
    {key:3, value:"경북" },
    {key:4, value:"경남" },
    {key:5, value:"전북" },
    {key:6, value:"전남" },
    {key:7, value:"충남" },
    {key:8, value:"충북" },
    {key:9, value:"강원" },
    {key:10, value:"기타" },
]

const stateContinents = [
    {key:1, value:"초,중학생" },
    {key:2, value:"고등학생" },
    {key:3, value:"대학생" },
    {key:4, value:"성인" },
]

function UploadProductPage(props) {

    const [PostTitle, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [AreaContinent, setAreaContinent] = useState(1)
    const [StateContinent, setStateContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const areaContinentChangeHandler = (event) => {
        //var target = areaContinents[`${event}`] 
        //setAreaContinent(target.key)
        setAreaContinent(event.currentTarget.value)
    }

    const stateContinentChangeHandler = (event) => {
        //var target = stateContinents[`${event}`] 
        //setStateContinent(target.key)
        setStateContinent(event.currentTarget.value)
    }
    

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        //event.preventDefault();
        console.log("Hello", Images.length)
        if(!PostTitle || !Description || !AreaContinent || !StateContinent || Images.length === 0){
            return alert("이거 다 경우의 수 처리하기 귀찮으니까 알아서 안 넣은 항목 찾아보셈")
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
            images: Images,
            areaCon : parseInt(AreaContinent),
            stateCon : parseInt(StateContinent)
        }

        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success){
                    alert('저장 성공')
                    props.history.push('/')
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

            <FileUpload refreshFunction={updateImages}/>

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
                <lavel> 지역 </lavel>
                <br />
                <select onChange={areaContinentChangeHandler} value={AreaContinent}>
                    {areaContinents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <lavel> 상태(?) </lavel>
                <br />
                <select onChange={stateContinentChangeHandler} value={StateContinent}>
                    {stateContinents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>

                <br />
                <br />
                <Button htmlType="submit"> 제출 </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage