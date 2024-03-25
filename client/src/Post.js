import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios'

const Post = ({ post, onEditPost, onDeletePost, onAddComment, onEditComment, onDeleteComment }) => {

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

    return (
        <div className="card">
            <h2>{post.post_body}</h2>
            <button onClick={toggleEdit}>Edit Post</button>
            <button onClick={deletePost}>Delete Post</button>
            <button onClick={toggleComment}>Add Comment</button>
            {editClicked ?
                <form className="edit" onSubmit={submitEditPost}>
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
                <form className="edit" onSubmit={submitComment}>
                    <input 
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={commentChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            : null}
            <ul>{post.comments.map(comment => <li key={comment.id}>
                <Comment 
                    comment={comment}
                    onEditComment={onEditComment}
                    onDeleteComment={onDeleteComment}
                /></li>)}
            </ul>
        </div>
    );
};

export default Post;