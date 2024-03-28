import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Comment = ({ comment, onEditComment, onDeleteComment, onUpdateCommentLikes }) => {

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
            setEditComment("")
            setEditClicked(false)
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

    const upVote = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/v1/comments/${comment.id}/upvote`)
            onUpdateCommentLikes(response.data, comment.post_id, comment.id)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Card style={{
            border: '1px solid #ced4da',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',  
            width: '24rem', 
            marginLeft: '20px', 
            marginBottom: '20px' }}>
            <Card.Title style={{ marginTop: "20px", marginLeft: "20px"}}>{comment.user_username}</Card.Title>
            <Card.Body>{comment.comment_body}</Card.Body>
            <ButtonGroup style={{ marginBottom: '20px', marginLeft: '10px' }}className="me-2" aria-label="First group">
                <Button variant="secondary" size="sm" onClick={toggleEditComment}>Edit Reply</Button>{' '}
                <Button variant="secondary" size="sm" onClick={deleteComment}>Delete Reply</Button>
            </ButtonGroup>
            <span style={{ marginLeft: "20px", marginBottom: "20px"}}className="comment-heart-icon">
                <i onClick={upVote} className="fas fa-heart"></i> {comment.likes}
            </span>
            {editClicked ?
                <form style={{ marginLeft: '20px', marginBottom: '20px' }} onSubmit={submitEditComment}>
                    <input 
                        type="text"
                        name="editcomment"
                        value={editComment}
                        onChange={editCommentChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            : null}
        </Card>
    );
};

export default Comment;