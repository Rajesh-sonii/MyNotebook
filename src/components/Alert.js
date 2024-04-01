import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Alert = () => {
  const {alert} = useContext(noteContext);

  // console.log() 
  return (<div style={{height: '50px'}}>{alert.show && <div className={`alert alert-${alert.type}`} role="alert">{alert.message}</div>}</div>)
}

export default Alert
