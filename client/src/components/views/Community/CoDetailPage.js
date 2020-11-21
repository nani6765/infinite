import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CoReply from './Reply/CoReply'
import CoReplyList from './Reply/CoReplyList'

function CoDetailPage(props) {

    const postId = props.match.params.post_by_id
    const data = props
    const [Post, setPost] = useState({})
    const [Reply, setReply] = useState([])
    const [ReplySize, setReplySize] = useState(0)

    useEffect(() => {
        axios.get(`/api/community/post_by_id?id=${postId}&type=single`)
            .then(response => {
                setPost(response.data[0])
                console.log("post", Post)
            })
            .catch(err => alert(err))
    }, [])
    
    const getreply = (body) => {
        axios.post('api/community/replys', body).
        then(response => {
            if(response.data.success){
                setReply(response.data.replyInfo);
                setReplySize(response.data.replySize)
            } else {
               alert("에러처리는 귀찮아.")
            }
        })
    }

    useEffect(() => {

        let body = {
            postid : postId
        }
        getreply(body)
    }, [])

    return (
        <div style={{ width: '70%', padding: '3rem 4rem' }}>

            <div style={{ justifyContent: 'center' }}>
                <h1>{Post.title}</h1>
            </div>
            <p>{Post.description}</p>
            <CoReplyList postId={postId} />
            <CoReply data={data} postId={postId}/>
        </div>
    )
    
}

export default CoDetailPage