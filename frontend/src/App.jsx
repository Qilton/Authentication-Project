import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import { useState } from 'react';
import RefrshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return (<>
    <div>This is a Private route.You need to be Logged in </div>
    
    <a href="/login">Login</a><br />
    <a href="/signup">Signup</a>
    </>)

  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;