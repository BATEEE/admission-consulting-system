import React, { useReducer, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Major from "./pages/Major";
import HollandTest from "./pages/HollandTest";
import Quiz from "./components/Quiz";
import School from "./pages/School";
import Login from "./pages/Login";
import Register from "./pages/Register";
import cookie from "react-cookies";
import { authApis, endpoints } from "./configs/Apis";
import MyUserReducer from "./reducers/MyUserReducer";
import { MyUserContext, MyDispatchContext } from "./configs/MyContext";
import AdminLayout from "./layouts/AdminLayout";
import UserTable from "./pages/admin/UserTable";
import BenchMark from "./pages/BenchMark";
import UniversityDetails from "./components/UniversityDetails";
import ScoreCheck from "./pages/ScoreCheck";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";

function ProtectedRoutes({ user, requiredRoles, isLoading }) {
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRoles && !requiredRoles.includes(user.role))
    return <Navigate to="/" replace />;
  return <Outlet />;
}

function App() {
  const initialUser = (() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  })();

  const [user, dispatch] = useReducer(MyUserReducer, initialUser);
  const [isLoading, setIsLoading] = useState(true);
  const [quizAllowed, setQuizAllowed] = useState(() => {
    return localStorage.getItem("quizAllowed") === "true";
  });

  useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      (async () => {
        try {
          let res = await authApis().get(endpoints["profile"]);
          dispatch({ type: "login", payload: res.data });
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.error("Token không hợp lệ hoặc hết hạn!", err);
          cookie.remove("token", { path: "/" });
          localStorage.removeItem("user");
          dispatch({ type: "logout" });
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleQuizStart = () => {
    setQuizAllowed(true);
    localStorage.setItem("quizAllowed", "true");
  };

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <Router>
          <Routes>
            {/* Routes dùng MainLayout (public routes) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/majors" element={<Major />} />
              <Route
                path="/quizzes"
                element={<Quiz onStart={handleQuizStart} />}
              />
              <Route
                path="/quizzes/holland-test"
                element={
                  quizAllowed ? <HollandTest /> : <Navigate to="/quizzes" />
                }
              />
              <Route path="/universities" element={<School />} />
              <Route path="/benchmark" element={<BenchMark />} />
              <Route path="/benchmark/universities/:id" element={<UniversityDetails />} />
              <Route path="/benchmark/score-check" element={<ScoreCheck />} />

              {/* Route cần login (vẫn dùng MainLayout) */}
              <Route
                element={<ProtectedRoutes user={user} isLoading={isLoading} />}
              >
                <Route
                  path="/my-account"
                  element={<h2>Tài khoản của tôi</h2>}
                />
              </Route>
            </Route>

            {/* Routes không dùng layout (Login/Register) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Route Admin (dùng AdminLayout riêng) */}
            <Route
              element={
                <ProtectedRoutes
                  user={user}
                  requiredRoles={["ADMIN"]}
                  isLoading={isLoading}
                />
              }
            >
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="users" element={<UserTable />} />
                <Route path="dashboards" element={<Dashboard />} />
                <Route
                  index
                  element={<Navigate to="/admin/dashboards" replace />}
                />
              </Route>
            </Route>

            {/* Route 404 */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Router>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
