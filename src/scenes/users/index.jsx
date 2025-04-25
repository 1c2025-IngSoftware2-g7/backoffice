import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecuritylinedIcon from '@mui/icons-material/SecurityOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { getAllUsers } from "../../api/users";
import { useEffect, useState } from "react";
import { mockUsers } from "../../mockData/mockUsers";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

      setUsers(mockUsers); /// eliminar cuando esta conectado el back

        // const fetchUsers = async () => {
        //     try {
        //         const data = await getAllUsers();
        //         setUsers(data);
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
    
        // fetchUsers();
    }, []);

      const columns = [
        { field: "uuid", headerName: "ID"},
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
        { field: "surname", headerName: "Surname", flex: 1, cellClassName: "name-column--cell" },
        { field: "email", headerName: "Email", flex: 3 },
        { field: "role", headerName: "Role", flex: 1,
          renderCell: ({ row: { role } }) => (
            <Box
              width="80%"
              // m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              style={{
                backgroundColor: role === "admin" ? colors.greenAccent[600] : colors.greenAccent[700],
                margin: "10px auto",
              }}
              borderRadius="4px"
            >
                {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {role === "student" && <HttpsOutlinedIcon />}
                {role === "teacher" && <LockOpenOutlinedIcon />}
                <Typography color = {colors.grey[100]} sx={{ ml: "5px" }}>
                    {role}
                </Typography>

            </Box>
          ),
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          renderCell: ({ value }) => (
            <span
              style={{
                color: value === "Active" ? "#388e3c" : "#d32f2f",
                fontWeight: 600,
              }}
            >
              {value}
            </span>
          ),
        },
      ];

    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Managing the Users" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    },
                }}
            >
                <DataGrid 
                    rows={users}
                    columns={columns}
                    getRowId={(row => row.uuid)}
                />
            </Box>
        </Box>
    )

}

export default Users;