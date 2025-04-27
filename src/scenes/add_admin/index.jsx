// import { Box } from "@mui/material";
// import Header from "../../components/Header";

// const Dashboard = () => {
//     return (
//         <Box m="20px">
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Header title="REGISTER ADMIN" subtitle="Add a new Admin" />
//             </Box>
//         </Box>
//     )
// }

// export default Dashboard;

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import Header from "../../components/Header";

const AddAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

    // Hash password (simple example, in reality do it server-side)
    const password_hashed = btoa(formData.password); // replace with proper hashing if needed

    const payload = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: password_hashed,
    };

    try {
      console.log("Creating admin with:", payload);
      // await createAdmin(payload);
      // optionally reset the form
      setFormData({ name: "", surname: "", email: "", password: "" });
      alert("Admin created!");
    } catch (err) {
      console.error(err);
      alert("Error creating admin");
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