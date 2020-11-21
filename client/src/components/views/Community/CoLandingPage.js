import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { SmileOutlined } from '@ant-design/icons';
import ChannelService from '../LandingPage/Section/ChannelService'
import SearchFeatures from '../LandingPage/Section/SearchFeatures'
import {Button, List} from 'antd';


function CoLandingPage() {
    const [Posts, setPosts] = useState([])
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")

    ChannelService.boot({
        "pluginKey": "93635d68-761c-4d5a-8cde-d63b06cf017c" 
    });
    // 채널톡 닫음
    //ChannelService.shutdown();

    const getPosts = (body) => {
        axios.post('api/community/posts', body).
        then(response => {
            if(response.data.success){
                if(body.loadMore){
                    setPosts([...Posts, ...response.data.postInfo])
                } else {
                    setPosts(response.data.postInfo.slice(0, 8));
                }
                setPostSize(response.data.postSize)
                //console.log(Posts)
            } else {
               alert("에러처리는 귀찮아.")
            }
        })
    }

    //검색 필터
    const UpdateSearchTerm = (newSearchTerm) => {
        let body = {
            searchTerm: newSearchTerm
        }
        setSearchTerm(newSearchTerm)
        getPosts(body)
    }

    useEffect(() => {

        let body = {
        }
        getPosts(body)
    }, [])
    
    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Infinite <SmileOutlined /></h2>
            </div>

             {/* Serach */}
             <div style={{display:'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                <SearchFeatures
                    refreshFunction={UpdateSearchTerm}
                />
            </div>
            <div style={{ textAlign: 'left'}}>
               
                <List
                    dataSource={Posts}
                    renderItem={item => (
                   <List.Item> 
                       <List.Item.Meta
                            title={<a href={`/community/${item._id}`}>{item.title}</a>}
                            description={item.writer.email}
                      />
                    </List.Item>
                     )}
                />

                <br/>
                <Button href="/community/upload">글 작성하기</Button>
            </div>
        </div>
    )
}

export default CoLandingPage
