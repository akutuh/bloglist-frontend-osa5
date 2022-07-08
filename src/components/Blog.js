import { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
          <br></br>{blog.likes} <button>like</button>
          <br></br>{blog.user.username}
        </div>  
      </div>
    </div>
  )
}

export default Blog