import { useState } from 'react'
const Blog = ({ blog, createBlog, removeBlog, user  }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideIfNotAddedByLoggedUser = { display: removeVisible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
    if (blog.user.username === user.username) {
      toggleRemoveVisibility()
    }
  }

  const toggleRemoveVisibility = () => {
    setRemoveVisible(!removeVisible)
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

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog({
      user: blog.user.username,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
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
        <div style={blogStyle} className='blog'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle} className='blogAll'>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          <br></br>{blog.url}
          <br></br>{blog.likes} <button onClick={likeBlog}>like</button>
          <br></br>{blog.user.username}
          <div style={hideIfNotAddedByLoggedUser}>
            <button onClick={deleteBlog}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog