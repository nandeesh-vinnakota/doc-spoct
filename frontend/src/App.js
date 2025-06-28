import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import PrivateRoute from "./components/common/PrivateRoute";
import ApplyDoctor from "./components/user/ApplyDoctor";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/adminhome"
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/userhome/*"
              element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              }
            >
              <Route
                path="userappointments/:doctorId"
                element={<UserAppointments />}
              />
              <Route
                path="applydoctor"
                element={<ApplyDoctor />}
              />
            </Route>
          </Routes>
        </div>
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2025 Copyright: YaseenCareBook</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
