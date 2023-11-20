import React, { useState, useEffect } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("/posts")
    .then((r) => r.json())
    .then(data => setPosts(data))
  }, [])

  const handleAddPost = (postObj) => {
    setPosts([...posts, postObj])
  }

  const handleEditPost = (postObj) => {
    const updatedPosts = posts.map(post => 
      (post.id === postObj.id ? postObj : post))
    setPosts(updatedPosts)
  }

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId)
    setPosts(updatedPosts)
  }

  const handleAddComment = (commentObj) => {
    const updatedPosts = posts.map(post => ({
        ...post,
        comments: post.id === commentObj.post_id
        ? [...post.comments, commentObj]
        : post.comments }))
    setPosts(updatedPosts)
  }

  const handleEditComment = (commentObj) => {
    const updatedPosts = posts.map(post => ({ 
        ...post,
        comments: post.id === commentObj.post_id
        ? post.comments.map(comment => comment.id === commentObj.id ? commentObj : comment)
        : post.comments }))
    setPosts(updatedPosts)
  }

  const handleDeleteComment = (commentObj) => {
    const updatedPosts = posts.map(post => ({
        ...post,
        comments: post.id === commentObj.post_id
        ? post.comments.filter(comment => comment.id !== commentObj.id)
        : post.comments }))
    setPosts(updatedPosts)
  }

  return (
    <>
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
      />
    )}
    </>
  );
}

export default App;
