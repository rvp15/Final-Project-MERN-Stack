
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/user' element={<Welcome/>}/>
      </Routes>
    </div>
  );
}

export default App;
