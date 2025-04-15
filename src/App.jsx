import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';
import { Navigate, Route, HashRouter as Router, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './custom.scss';
import "yet-another-react-lightbox/styles.css";


import { SESSION_TOKEN } from './Helper/EStore';
import EStore from './lib/EStore';
import LoginPage from './views/LoginPage';
import Message from './views/Message';

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await EStore.getItem(SESSION_TOKEN);
      if (!token) {
        navigate('/login');
      }
    };
    fetchToken();
  }, [navigate]);

  const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/message', element: <Message /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
