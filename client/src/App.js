import React, { useState, useEffect } from 'react'
import CreatePost from './CreatePost';
import Post from './Post';
import axios from 'axios'

function App() {

  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/posts")
        setPosts(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddPost = (postObj) => {
    setPosts(prevPosts => [postObj, ...prevPosts])
  }

  const handleEditPost = (postObj) => {
    setPosts(prevPosts => prevPosts.map(post => (
      post.id === postObj.id ? postObj : post )))
  }

  const handleDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
  }

  const handleAddComment = (commentObj) => {
    setPosts(prevPosts => prevPosts.map(post => ({
      ...post,
      comments: post.id === commentObj.post_id
      ? [commentObj, ...post.comments]
      : post.comments })))
  }

  const handleEditComment = (commentObj) => {
    setPosts(prevPosts => prevPosts.map(post => ({
      ...post,
      comments: post.id === commentObj.post_id
      ? post.comments.map(comment => comment.id === commentObj.id ? commentObj : comment)
      : post.comments })))
  }

  const handleDeleteComment = (postId, commentId) => {
    setPosts(prevPosts => prevPosts.map(post => ({
      ...post,
      comments: post.id === postId
      ? post.comments.filter(comment => comment.id !== commentId)
      : post.comments
    })))
  }

  if (error) {
    return <div><h1>{error}</h1></div>
  }

  if (loading) {
    return <div><h1>Loading...</h1></div>
  }

  return (
    <div>
      <CreatePost onAddPost={handleAddPost}/>
      {posts.map(post => 
        <Post 
          key={post.id} 
          post={post} 
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />)}
          
    </div>
  );
}

export default App;
