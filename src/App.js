import Main from './components/main';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector,useDispatch } from 'react-redux';
import { login, logout } from './state-managment/slice';
import CvPage from './components/cvpage';
import './App.css';
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route 
          path="/main" 
          element={isAuthenticated ? <Main onLogout={() => dispatch(logout())} /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<LoginPage onLogin={() => dispatch(login())} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cvpage" element={<CvPage />} />

      </Routes>
    </Router>
    // <div>
    //   <CvPage></CvPage>
    // </div>
  );
}

export default App;
