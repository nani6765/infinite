import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Comment } from 'antd';

function CoReplyList(props) {

    const postId = props.postId
    const [Replys, setReplys] = useState([])
    const [ReplySize, setReplySize] = useState(0)

    const getreply = (body) => {
        axios.post('/api/reply/replys', body).
        then(response => {
            if(response.data.success){
                setReplys(response.data.replyInfo);
                setReplySize(response.data.replySize)
            } else {
               alert("에러처리는 귀찮아.")
            }
        })
        console.log("Reply", Replys)
    }

    const renderReply = Replys.map((reply, index) => {
        return <div style={{marginBottom:"16px"}}>
                    <Comment
                        author={reply.writer.email}
                        content={reply.description}
                        datetime={reply.updateAt}
                    />
               </div>
    })

    useEffect(() => {
        let body = {
            postid : postId
        }
        getreply(body)
    }, [])

    return (
        <div>
            {renderReply}
        </div>
    )
    
}

export default CoReplyList