import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen'
import RegistrationScreen from './pages/RegistrationScreen'
import DashBoardScreen from './pages/DashBoardScreen'
import CreateWorkoutScreen from './pages/CreateWorkoutScreen';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginScreen />}/>
        <Route path='/register' element={<RegistrationScreen />}/>
        <Route path='/dashboard' element={<DashBoardScreen />}/>        
        <Route path='/user/create-workout' element={<CreateWorkoutScreen />}/>        
      </Routes>      
    </Router>      
  )
}

export default App
