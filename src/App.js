import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password 
        <input 
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  
  const addBlog = async (blogObject) => {
    
      try {
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        blogFormRef.current.toggleVisibility()
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('creation failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  } 
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false);
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null ?
        <div>
          <h1>log in to application</h1>
          <Notification message={errorMessage}/>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage}/>
          <p>{user.name} logged in <button onClick={handleLogout}> logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
