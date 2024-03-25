import React, { useState } from 'react';
import axios from 'axios'

const Comment = ({ comment, onEditComment, onDeleteComment }) => {

    const [editClicked, setEditClicked] = useState(false)
    const [editComment, setEditComment] = useState("")

    const toggleEditComment = () => {
        setEditClicked(!editClicked)
        setEditComment(comment.comment_body)
    }

    const submitEditComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/api/v1/comments/${comment.id}`, {
                comment_body: editComment
            })
            onEditComment(response.data)
            setEditComment("")
            setEditClicked(false)
        } catch (error) {
            console.error(`Error editing comment ${error.message}`)
        }
    }

    const editCommentChange = (e) => {
        setEditComment(e.target.value)
    }

    const deleteComment = async () => {
        try {
            await axios.delete(`/api/v1/comments/${comment.id}`)
            onDeleteComment(comment.post_id, comment.id)
        } catch (error) {
            console.error(`Error deleting comment ${error.message}`)
        }
    }

    return (
        <div>
            <h3>{comment.comment_body}</h3>
            <button onClick={toggleEditComment}>Edit Comment</button>
            <button onClick={deleteComment}>Delete Comment</button>
            {editClicked ?
                <form className="edit" onSubmit={submitEditComment}>
                    <input 
                        type="text"
                        name="editcomment"
                        value={editComment}
                        onChange={editCommentChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            : null}
        </div>
    );
};

export default Comment;