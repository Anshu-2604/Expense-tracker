import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './assets/Home';
import Login from './assets/Login';
import Dashboard from './assets/Dashboard';
import ProtectedRoute from './assets/protected';
import Label from './assets/Label';

function App() {
return(
  <Routes>
      <Route path="/" element={<><Label/><Home /></>} />
      <Route path='/login' element={<><Label/><Login/></>} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>}/>
    </Routes>
)
}

export default App
