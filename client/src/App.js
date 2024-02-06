import './App.css';
import Header from './components/Header/Header'
import AdminLogin from './pages/Admin/AdminLogin.js'
import Admin from './pages/Admin/Admin.js'
import JudgeLogin from './pages/Judge/JudgeLogin.js'
import Judge from './pages/Judge/Judge.js'

import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import AppLayout from './pages/AppLayout.js';
import Modal from 'react-modal' 
Modal.setAppElement('#root');


function App() {
  return (
    <Router>
        <AppLayout/>
    </Router>
   
  );
}

export default App;
