import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import './FileUpload.css';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header : {'Content-Type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                
                if(response.data.success){
                    alert("파일 업로드 성공")
                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                }
                else{
                    console.log(response.data)
                    alert("파일 업로드 실패")
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
        alert("파일이 삭제되었습니다.")
    }

    return (
        <div style={{display:'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                <div 
                    style={{width:300, height:240, border:'1px solid lightgray',
                            display:'flex', alignItems:'center', justifyContent:'center'
                        }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <UploadOutlined style={{fontSize:'3rem'}}/>
                </div>
                )}
            </Dropzone>

            <div style={{ display:'flex', width:350, height:240, overflowX:'scroll', overflowY:'hidden'}} className="scrollStyle">
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ display:'block', minWidth:'300px', width:'300px', height:'230px', maxHeight:'230px'}}
                        src={`http://localhost:5000/${image}`} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FileUpload
