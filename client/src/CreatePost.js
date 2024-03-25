import React, { useState } from 'react';
import axios from 'axios'

const CreatePost = ({ onAddPost }) => {

    const [post, setPost] = useState("")

    const submitPost = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/v1/posts", {
                post_body: post
            })
            onAddPost(response.data)
            setPost("")
        } catch (error) {
            console.error(`Error posting ${error.message}`)
        }
    }

    const postChange = (e) => {
        setPost(e.target.value)
    }

    return (
        <div>
            <br></br>
            <form onSubmit={submitPost}>
                <input 
                    type="text"
                    name="post"
                    value={post}
                    onChange={postChange}
                />
                <button type="submit">Submit</button>
            </form>
            <br></br>
        </div>
    );
};

export default CreatePost;