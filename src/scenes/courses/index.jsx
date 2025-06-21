import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { getAllCourses } from "../../api/courses";
import { useEffect, useState } from "react";



const Courses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                setCourses(response);
                console.log("response:", response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCourses();
    }, []);

      const columns = [
        { field: "rowNumber", headerName: "#", flex: 0.5, headerAlign: "left", renderCell: (params) =>
            `${params.api.getAllRowIds().indexOf(params.id) + 1}`},
        { field: "_id", headerName: "ID", type:"number", headerAlign: "left", flex: 1},
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
        { field: "creator_id", headerName: "Creator ID", felx:1, type:"number", headerAlign: "left", flex: 1},
        { field: "creator_name", headerName: "Creator Name", flex: 1},
        { field: "max_students", headerName: "Max Students", type:"number", headerAlign: "left"},
        { field: "course_start_date", headerName: "Start Date"},
        { field: "course_end_date", headerName: "End Date"},
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
                        backgroundColor: `${colors.blueAccent[700]} !important`,
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
                {/* Tabla */}
                <DataGrid 
                    rows={courses}
                    columns={columns}
                    getRowId={(row => row._id)}
                    loading={loading}
                    showToolbar
                />

            </Box>
        </Box>
    )

}

export default Courses;