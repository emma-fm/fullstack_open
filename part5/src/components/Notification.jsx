const Notification = ({ message, error }) => {
  const st = {
    color: (error === true) ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10
  }

  if (message === '') return null

  return(
    <div style={st}>
      {message}
    </div>
  )
}

export default Notification