import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../../api/users";
import { saveUserLoginData } from "../../utils/storage";
import Header from "../../components/Header";
import {userErrors, serverErrors} from "../../utils/errors";  
import { Alert } from "@mui/material";

import { Box, Button, TextField, Typography, useTheme, Paper, responsiveFontSizes } from "@mui/material";
import { tokens } from "../../theme";

const Login = () => {
  const { isLogged, setIsLogged, setLoggedUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  const handleSubmit = async (e) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      // Revisa si la respuesta fue exitosa
      if (!res.ok) {
        if (res.status === userErrors.EMAIL_NOT_FOUND) {
          setErrorMessage("Email not found");
          // alert("Email not found");
        } else if (res.status === userErrors.PASSWORD_INCORRECT) {
          setErrorMessage("Password is incorrect");
          // alert("Password is incorrect");
        } else {
          setErrorMessage(`Unexpected error: ${res.status}`)
          // alert(`Unexpected error: ${res.status}`);
        }
        setEmail("");
        setPassword("");
        return;
      } 
      const response = await res.json(); 

      if (response.data.status === "inactive") {
        setErrorMessage("You no longer have access to this page. Contact your administrator.");
        setEmail("");
        setPassword("");
        return;
      }
      
      console.log("Login successful:", response);
      saveUserLoginData(response.data);
      setIsLogged(true);
      setLoggedUser(response.data);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error", err)
      alert("There's been an error while logging in. Please try again later.");
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
          {errorMessage && (
            <Alert
              severity="warning"
              onClose={() => setErrorMessage("")}
              variant="filled"
              sx={{ mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}
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