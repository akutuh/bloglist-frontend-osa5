const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.includes('wrong credentials') || message.includes('creation failed') || message.includes('allowed')) {
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  } else {
    const errorStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
}

export default Notification

