import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen'
import RegistrationScreen from './pages/RegistrationScreen'
import DashBoardScreen from './pages/DashBoardScreen'
import CreateWorkoutScreen from './pages/CreateWorkoutScreen';
import MuscleGroupSelector from './pages/MuscleGroupSelector';
import HomePage from './pages/HomePage';
import ReactModal from 'react-modal';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    ReactModal.setAppElement('#root'); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginScreen />}/>
        <Route path='/register' element={<RegistrationScreen />}/>
        <Route path='/dashboard' element={<DashBoardScreen />}/>        
        <Route path='/user/create-workout' element={<CreateWorkoutScreen />}/>        
      </Routes>      
    </Router>      
  )
}

export default App
