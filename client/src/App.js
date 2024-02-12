import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import AppLayout from './pages/AppLayout.js';
import Modal from 'react-modal' 
import { AuthProvider } from './context/AuthProvider.js';
Modal.setAppElement('#root');


function App() {
  return (
    <Router>
      <AuthProvider>
          <AppLayout/>  
      </AuthProvider>
    </Router>
   
  );
}

export default App;
