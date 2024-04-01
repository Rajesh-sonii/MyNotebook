// import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
// import NoteState from './context/notes/NoteState';
import { useContext } from 'react';
import noteContext from './context/notes/noteContext';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const { alert } = useContext(noteContext);
  // const { alert } = context;
  // console.log(alert)

  return (
    <Router>
      <Navbar />
      <Alert alert={alert} />
      {/* <div className='container mx-6'> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes> 
      {/* </div> */}
    </Router>
  );
}

export default App; 
