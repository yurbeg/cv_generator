import Main from "./components/main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./state-managment/slice/authSlice";
import CvPage from "./components/cvpage";
import "./App.css";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        <Route index  element={!isAuthenticated?<LoginPage />:<Navigate to={"/main"}/>} />
        <Route
          path="/main"
          element={
            isAuthenticated ? (
              <Main onLogout={() => dispatch(logout())} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!isAuthenticated?<LoginPage onLogin={() => dispatch(login())} />:<Navigate to={"/main"} />}
        />
        <Route path="/register" element={!isAuthenticated?<RegisterPage />:<Navigate to={"/main"}/> } />
        <Route path="/cvpage" element={isAuthenticated?<CvPage />:<Navigate to={"/login"}/>} />
      </Routes>
    </Router>
  );
}

export default App;
