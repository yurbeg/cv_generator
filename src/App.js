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
import { ROUTE_CONSTANTS } from "./core/constants/constanst";
import "./App.css";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        <Route index  element={!isAuthenticated?<LoginPage />:<Navigate to={ROUTE_CONSTANTS.MAIN}/>} />
        <Route
          path={ROUTE_CONSTANTS.MAIN}
          element={
            isAuthenticated ? (
              <Main onLogout={() => dispatch(logout())} />
            ) : (
              <Navigate to={ROUTE_CONSTANTS.LOGIN} />
            )
          }
        />
        <Route
          path={ROUTE_CONSTANTS.LOGIN}
          element={!isAuthenticated?<LoginPage onLogin={() => dispatch(login())} />:<Navigate to={ROUTE_CONSTANTS.MAIN} />}
        />
        <Route path={ROUTE_CONSTANTS.REGISTER} element={!isAuthenticated?<RegisterPage />:<Navigate to={ROUTE_CONSTANTS.MAIN}/> } />
        <Route path={ROUTE_CONSTANTS.CVPAGE} element={isAuthenticated?<CvPage />:<Navigate to={ROUTE_CONSTANTS.LOGIN}/>} />
      </Routes>
    </Router>
  );
}

export default App;
