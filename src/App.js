import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

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
      setBlogs( blogs.sort((a, b) => b.likes - a.likes ))
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

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false);
  }

  
  const addBlog = async (blogObject) => {
      try {
        const returnedBlog = await blogService.create(blogObject)
        let returnedBloguserid = returnedBlog.user
        returnedBlog.user = {username: user.username, id: returnedBloguserid}
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

  const likeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.like(blogObject)
      let  blogsCopy = [...blogs]
      let obj = blogsCopy.find(b => b.id === returnedBlog.id)
      obj.likes = returnedBlog.likes
      setBlogs(blogsCopy.sort((a, b) => b.likes - a.likes))      
    } catch (exception) {
      setErrorMessage('creation failed (like)')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
        await blogService.remove(blogObject)
        let  blogsCopy = [...blogs]
        setBlogs(blogsCopy.filter(b => b.id !== blogObject.id)) 
        setErrorMessage(`blog ${blogObject.title} by ${blogObject.author} was removed`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null ?
        <div>
          <h1>log in to application</h1>
          <Notification message={errorMessage}/>
          <Togglable buttonLabel='login'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage}/>
          <p>{user.name} logged in <button onClick={handleLogout}> logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} user={user} blog={blog} createBlog={likeBlog} removeBlog={deleteBlog}  />
          )}
        </div>
      }
    </div>
  )
}

export default App
