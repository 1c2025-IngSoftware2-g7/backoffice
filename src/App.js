import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/index";
import Sidebar from "./scenes/global/Sidebar";
import Users from "./scenes/users/index"
import Courses from "./scenes/courses/index"
import LoginModal from "./scenes/login/Login";
import { AuthProvider } from "./context/AuthContext";
import AddAdmin from "./scenes/add_admin";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
        <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<LoginModal />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/admin" element={<AddAdmin />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
