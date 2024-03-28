import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Comment from './Comment';
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './poststyle.css';

const Post = ({ post, onEditPost, onDeletePost, onAddComment, onEditComment, onDeleteComment, onUpdatePostLikes, onUpdateCommentLikes }) => {

    const [editClicked, setEditClicked] = useState(false)
    const [editPost, setEditPost] = useState("")
    const [commentClicked, setCommentClicked] = useState(false)
    const [comment, setComment] = useState("")

    const toggleEdit = () => {
        setEditClicked(!editClicked)
        setEditPost(post.post_body)
    }

    const submitEditPost = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`/api/v1/posts/${post.id}`, {
                post_body: editPost
            })
            onEditPost(response.data)
            setEditPost("")
            setEditClicked(false)
        } catch (error) {
            console.error(`Error editing ${error.message}`)
        }
    }

    const editPostChange = (e) => {
        setEditPost(e.target.value)
    }

    const deletePost = async () => {
        try {
            await axios.delete(`/api/v1/posts/${post.id}`)
            onDeletePost(post.id)
        } catch (error) {
            console.error(`Error deleting ${error.message}`)
        }
    }

    const submitComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/v1/posts/${post.id}/comments`, {
                comment_body: comment
            })
            onAddComment(response.data)
            setComment("")
            setCommentClicked(false)
        } catch (error) {
            console.error(`Error posting comment ${error.message}`)
        }
    }

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const toggleComment = () => {
        setCommentClicked(!commentClicked)
    }

    const upVote = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/v1/posts/${post.id}/upvote`)
            onUpdatePostLikes(response.data)
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
            width: '30rem', 
            marginBottom: '20px' }}>
                <Card.Title style={{ marginTop: "20px", marginLeft: "20px"}}>{post.user.username}</Card.Title>
                <Card.Body>{post.post_body}</Card.Body>
                <ButtonGroup style={{ marginBottom: '20px', marginLeft: '10px' }}className="me-2" aria-label="First group">
                    <Button variant="secondary" size="sm" onClick={toggleEdit}>Edit Post</Button>{' '}
                    <Button variant="secondary" size="sm" onClick={deletePost}>Delete Post</Button>{' '}
                    <Button variant="secondary" size="sm" onClick={toggleComment}>Reply</Button>
                </ButtonGroup>
                <span style={{ marginLeft: "20px", marginBottom: "20px"}}className="heart-icon">
                    <i onClick={upVote} className="fas fa-heart"></i> {post.likes}
                </span>
            {editClicked ?
                <form style={{ marginLeft: '20px', marginBottom: '20px' }} onSubmit={submitEditPost}>
                    <input 
                        type="text"
                        name="editpost"
                        value={editPost}
                        onChange={editPostChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            : null}
            {commentClicked ?
                <form style={{ marginLeft: '20px', marginBottom: '20px' }} onSubmit={submitComment}>
                    <input 
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={commentChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            : null}
                {post.comments.map((comment, index) => (
                <Comment 
                    key={index} 
                    comment={comment} 
                    onEditComment={onEditComment} 
                    onDeleteComment={onDeleteComment} 
                    onUpdateCommentLikes={onUpdateCommentLikes}/>
                ))}
        </Card>
    );
};

export default Post;