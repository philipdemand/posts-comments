import React, { useState } from 'react'

function Comment({ comment, onEditComment, onDeleteComment }) {

    const [isEditClicked, setIsEditClicked] = useState(false)
    const [editCommentValue, setEditCommentValue] = useState("")

    const toggleEditComment = () => {
        setIsEditClicked(!isEditClicked)
        setEditCommentValue(comment.comment_body)
    }

    const editCommentSubmit = (e) => {
        e.preventDefault()
        fetch(`/comments/${comment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({comment_body: editCommentValue})
        })
        .then((r) => r.json())
        .then(object => onEditComment(object))
        .then(setEditCommentValue(""))
        .then(setIsEditClicked(false))
    }

    const editCommentChange = (e) => {
        setEditCommentValue(e.target.value)
    }

    const handleDeleteClick = () => {
        fetch(`/comments/${comment.id}`, {
           method: "DELETE" 
        })
        .then(() => onDeleteComment(comment))
    }

    return (
        <>
        <h3>{comment.comment_body}</h3>
        <button onClick={toggleEditComment}>Edit Comment</button>
        <button onClick={handleDeleteClick}>Delete Comment</button>
        {isEditClicked ? 
            <form onSubmit={editCommentSubmit}>
                Edit Comment:
                <input 
                    type="text"
                    name="editcomment"
                    value={editCommentValue}
                    onChange={editCommentChange}
                />
                <button type="submit">Submit</button>
            </form>
        : null}
        </>
    )
}

export default Comment