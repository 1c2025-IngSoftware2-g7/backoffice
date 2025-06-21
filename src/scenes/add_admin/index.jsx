import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { createAdmin } from "../../api/admin";
import { Alert } from "@mui/material";

const AddAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loggedUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      admin_email: loggedUser.email,
      admin_password: loggedUser.password,
    };

    try {
      console.log("Creating admin with:", payload);
      await createAdmin(payload);
      setFormData({ name: "", surname: "", email: "", password: "" });
      setSuccessMessage("Admin created!")
    } catch (err) {
      console.error(err);
      setErrorMessage("Error creating admin");
    }
  };

  return (
    <Box m="20px">
      <Header title="REGISTER ADMIN" subtitle="Create a New Admin User" />
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
        }}
      >
        {errorMessage ? (
          <Alert
            severity="warning"
            onClose={() => setErrorMessage("")}
            variant="filled"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        ) : 
        successMessage ? (
          <Alert
            severity="success"
            onClose={() => setSuccessMessage("")}
            variant="filled"
            sx={{ mb: 2 }}
          >
            {successMessage}
          </Alert>
        ) : null
        }
        <TextField
          label="First Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Box gridColumn="span 2">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Create Admin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdmin;