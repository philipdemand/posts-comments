import React, { useState } from 'react'

function CreatePost({ onAddPost }) {

    const [postValue, setPostValue] = useState("")
    const [errorData, setErrorData] = useState(null)

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
        .then((response) => {
            if (response.ok) {
              return response.json().then((object) => {
                onAddPost(object);
              })
            } else {
              response.json().then((data) => setErrorData(data.errors))
            }
          })
        .then(() => {
          setErrorData(null);
          setPostValue("");
        })
    }

    return (
        <>
        <br/>
        <form onSubmit={handleSubmit}>
            Submit Post:{" "}
            <input
                type="text"
                name="submitpost"
                value={postValue}
                onChange={handleChange}
            />
            {" "}
            <button type="submit">Submit</button>
        </form>
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

export default CreatePost