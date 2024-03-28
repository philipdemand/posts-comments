import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
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
            setPost("")
        }
    }

    const postChange = (e) => {
        setPost(e.target.value)
    }

    return (
        <div>
            <br></br>
            <Form onSubmit={submitPost}>
                <input 
                    type="text"
                    name="post"
                    placeholder="What's On Your Mind Today?"
                    value={post}
                    onChange={postChange}
                    style={{ width: '300px' }}
                />
                <button type="submit">Submit</button>
            </Form>
            <br></br>
        </div>
    );
};

export default CreatePost;