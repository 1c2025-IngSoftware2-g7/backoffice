import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/index";
import Sidebar from "./scenes/global/Sidebar";
import Users from "./scenes/users/index";
import Courses from "./scenes/courses/index";
import Login from "./scenes/login/Login";
import AuxTeachers from "./scenes/aux_teachers/index";
import { AuthProvider } from "./context/AuthContext";
import AddAdmin from "./scenes/add_admin";
import PrivateRoute from "./private_route";
import { useLocation } from "react-router-dom";

function MainAppView() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <div className="app">
            {!isLoginPage && <Sidebar />}{" "}
            {/* Sidebar solo si NO estás en login */}
            <main className="content">
              {!isLoginPage && <Topbar />}{" "}
              {/* Topbar solo si NO estás en login */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <Users />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AddAdmin />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/auxteachers"
                  element={
                    <PrivateRoute>
                      <AuxTeachers />
                    </PrivateRoute>
                  }
                />
                {/* <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} /> */}
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainAppView />
    </AuthProvider>
  );
}

export default App;
