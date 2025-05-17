import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/users";
import { saveUserLoginData } from "../../utils/storage";
import Header from "../../components/Header";

import { Box, Button, TextField, Typography, useTheme, Paper } from "@mui/material";
import { tokens } from "../../theme";

const Login = () => {
  const { setIsLogged, setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      await saveUserLoginData(response.data);
      setIsLogged(true);
      setLoggedUser(response.data);
      navigate("/dashboard");
    } catch (err) {
      if (err.status == 404) {
        alert("Email not found");
      } else if (err.status == 403) {
        alert("Password is incorrect");
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={colors.primary[400]}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Header title="CLASSCONNECT" subtitle="Backoffice of app ClassConnect" center={true} />
        <Paper elevation={6} sx={{ padding: 6, width: 400 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;