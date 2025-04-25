import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecuritylinedIcon from '@mui/icons-material/SecurityOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { getAllCourses } from "../../api/courses";
import { useEffect, useState } from "react";
import { mockCourses } from "../../mockData/mockCourses";

const Courses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setCourses(mockCourses); /// eliminar cuando esta conectado el back

        // const fetchCourses = async () => {
        //     try {
        //         const data = await getAllCourses();
        //         setCourses(data);
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
    
        // fetchCourses();
    }, []);

      const columns = [
        { field: "course_id", headerName: "ID", type:"number", headerAlign: "left"},
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
        { field: "creator_id", headerName: "Creator ID", type:"number", headerAlign: "left"},
        { field: "creator_name", headerName: "Creator Name", flex: 1},
        { field: "max_students", headerName: "Max Students", type:"number", headerAlign: "left"},
        { field: "course_start_date", headerName: "Start Date"},
        { field: "course_end_date", headerName: "End Date"},
        // { field: "description", headerName: "Description", flex: 3},
      ];

    return (
        <Box m="20px">
            <Header title="COURSES" subtitle="Managing the Courses" />
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
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
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
                    rows={courses}
                    columns={columns}
                    getRowId={(row => row.course_id)}
                />
            </Box>
        </Box>
    )

}

export default Courses;