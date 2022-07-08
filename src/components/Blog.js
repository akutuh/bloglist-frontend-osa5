import { useState } from 'react'
const Blog = ({ blog, createBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    createBlog({
      user: blog.user.username,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
} 

  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>  
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          <br></br>{blog.url}
          <div>
          {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <br></br>{blog.user.username}
        </div>  
      </div>
    </div>
  )
}

export default Blog