import React, { useState } from 'react'
import Comment from './Comment'

function Post({ post, onEditPost, onDeletePost, onAddComment, onEditComment, onDeleteComment }) {

    const [editPostClicked, setEditPostClicked] = useState(false)
    const [editPostValue, setEditPostValue] = useState("")
    const [commentClicked, setCommentClicked] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [errorData, setErrorData] = useState(null)

    const toggleEditPost = () => {
        setEditPostClicked(!editPostClicked)
        setEditPostValue(post.post_body)
    }

    const editPostSubmit = (e) => {
        e.preventDefault()
        fetch(`/posts/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post_body: editPostValue})
        })
        .then((r) => r.json())
        .then(object => onEditPost(object))
        .then(setEditPostValue(""))
        .then(setEditPostClicked(false))
    }

    const editPostChange = (e) => {
        setEditPostValue(e.target.value)
    }

    const handleDeleteClick = () => {
        fetch(`/posts/${post.id}`, {
            method: "DELETE"
        })
        .then(() => onDeletePost(post.id))
    }

    const toggleAddComment = () => {
        setCommentClicked(!commentClicked)
    }

    const commentSubmit = (e) => {
        e.preventDefault()
        const submitData = {
            comment_body: commentValue
        }
        fetch(`posts/${post.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitData)
        })
        .then((response) => {
            if (response.ok) {
              return response.json().then((object) => {
                onAddComment(object);
              })
            } else {
              response.json().then((data) => setErrorData(data.errors))
            }
          })
        .then(setCommentValue(""))
        .then(setCommentClicked(false))
        .then(setErrorData(null))
    }

     const commentChange = (e) => {
        setCommentValue(e.target.value)
     }

    return (
        <>
        <h1>{post.post_body}</h1>
        <button onClick={toggleEditPost}>Edit Post</button>
        <button onClick={handleDeleteClick}>Delete Post</button>
        <button onClick={toggleAddComment}>Submit Comment</button>
        {editPostClicked ? 
            <form onSubmit={editPostSubmit}>
                Edit Post:
                <input 
                    type="text"
                    name="editpost"
                    value={editPostValue}
                    onChange={editPostChange}
                />
                <button type="submit">Submit</button>
            </form>
        : null}
        {commentClicked ? 
            <form onSubmit={commentSubmit}>
                Submit Comment:
                <input 
                    type="text"
                    name="submitcomment"
                    value={commentValue}
                    onChange={commentChange}
                />
                <button type="submit">Submit</button>
            </form>
        : null}
        <ul>
        {post.comments.map(comment => 
            <li key={comment.id}>
                <Comment 
                    comment={comment} 
                    onEditComment={onEditComment}
                    onDeleteComment={onDeleteComment}
                />
            </li>
        )}
        </ul>
        {errorData && (
        <div style={{ color: 'red' }}>
          <ul>
            {errorData.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        </>
    )
}

export default Post