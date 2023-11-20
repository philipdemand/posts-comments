import React, { useState } from 'react'

function CreatePost({ onAddPost }) {

    const [postValue, setPostValue] = useState("")

    const handleChange = (e) => {
        setPostValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const submitData = {
            post_body: postValue
        }
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitData)
        })
        .then((r) => r.json())
        .then(object => onAddPost(object))
        .then(setPostValue(""))
    }

    return (
        <>
        <br/>
        <form onSubmit={handleSubmit}>
            Submit Post:
            <input
                type="text"
                name="submitpost"
                value={postValue}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default CreatePost