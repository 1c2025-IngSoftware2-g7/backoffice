import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { getAllCourses } from "../../api/courses";
import { useEffect, useState } from "react";
import { mockCourses } from "../../mockData/mockCourses";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";


const Courses = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


    useEffect(() => {

        // setCourses(mockCourses); /// eliminar cuando esta conectado el back

        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                setCourses(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCourses();
    }, []);


    // "_id": self._id,
    // "name": self.name,
    // "description": self.description,
    // "max_students": self.max_students,
    // "course_start_date": self.course_start_date,
    // "course_end_date": self.course_end_date,
    // "enroll_date_start": self.enroll_date_start,
    // "enroll_date_end": self.enroll_date_end,
    // "creator_id": self.creator_id,
    // "creator_name": self.creator_name,
    // "students": self.
    // "resources": self.resources,
    // "correlatives_subjects_ids": self.correlatives_subjects_ids,
    //     }
      const columns = [
        { field: "_id", headerName: "ID", type:"number", headerAlign: "left", flex: 1},
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell"},
        { field: "creator_id", headerName: "Creator ID", felx:1, type:"number", headerAlign: "left", flex: 1},
        { field: "creator_name", headerName: "Creator Name", flex: 1},
        { field: "max_students", headerName: "Max Students", type:"number", headerAlign: "left"},
        { field: "course_start_date", headerName: "Start Date"},
        { field: "course_end_date", headerName: "End Date"},
        // { field: "description", headerName: "Description", flex: 3},
      ];

    return (
        <Box m="20px">
            {/* <Header title="COURSES" subtitle="Managing the Courses" /> */}
            <Header 
                title="COURSES" 
                subtitle="Managing the Courses"
                action={
                    <button
                        onClick={() => setOpenConfirmDialog(true)}
                        disabled={selectedIds.length === 0}
                        style={{
                            backgroundColor: colors.redAccent[600],
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                        }}
                    >
                        Eliminar seleccionados
                    </button>
                }
            />

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
                {/* Eliminar curso */}
                {/* <Box display="flex" justifyContent="flex-end" mb={2}>
                    <button
                        onClick={() => setOpenConfirmDialog(true)}
                        disabled={selectedIds.length === 0}
                        style={{
                        backgroundColor: colors.redAccent[600],
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: selectedIds.length === 0 ? "not-allowed" : "pointer",
                        }}
                    >
                        Eliminar seleccionados
                    </button>
                </Box> */}
                
                {/* Tabla */}
                <DataGrid 
                    rows={courses}
                    columns={columns}
                    getRowId={(row => row._id)}
                    loading={loading}
                    checkboxSelection
                    onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
                />


                {/* Dialog de confirmacion */}
                <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                    <DialogTitle>¿Estás seguro?</DialogTitle>
                    <DialogContent>
                        <Typography>Vas a eliminar {selectedIds.length} curso(s). Esta acción no se puede deshacer.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
                        <Button
                        onClick={() => {
                            // 🔥 Aca eliminás del estado, o llamás a la API para eliminar
                            setCourses((prev) => prev.filter((course) => !selectedIds.includes(course._id)));
                            setSelectedIds([]);
                            setOpenConfirmDialog(false);
                        }}
                        color="error"
                        variant="contained"
                        >
                        Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )

}

export default Courses;