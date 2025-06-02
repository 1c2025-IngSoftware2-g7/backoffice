import {Box, useTheme, Typography} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { getAllAuxTeachers, changeHelperPermissions } from "../../api/courses";
import { useEffect, useState } from "react";
import { mockTeachers } from "../../mockData/mockTeachers"; // Mock data for testing, remove when connected to backend
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const permissions = [
    'ModulesAndResources',
    'Exams',
    'Tasks',
    'Feedbacks'
]

const AuxTeachers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setTeachers(mockTeachers); /// eliminar cuando esta conectado el back
        setLoading(false); // Remove this line when connected to backend

        // const fetchCourses = async () => {
        //     try {
        //         const response = await getAllAuxTeachers();
        //         setTeachers(response);
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
    
        // fetchCourses();
    }, []);


      const columns = [
        { field: "rowNumber", headerName: "#", flex: 0.5, headerAlign: "left", renderCell: (params) =>
            `${params.api.getAllRowIds().indexOf(params.id) + 1}`},
        { field: "_id", headerName: "Course ID", type:"number", headerAlign: "left", flex: 1},
        { field: "course_name", headerName: "Course Name", flex: 2, cellClassName: "name-column--cell"},
        // { field: "creator_id", headerName: "Creator ID", type:"number", headerAlign: "left", flex: 1},
        { field: "uuid", headerName: "Teacher ID", type:"number", headerAlign: "left", flex: 1},
        { field: "name", headerName: "Teacher Name", flex: 2, cellClassName: "name-column--cell"},
        ...permissions.map((permission) => ({
            field: permission,
            headerName: permission == 'ModulesAndResources' ? 'Modules and Resources' : permission,
            flex: 2,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
              const handleTogglePermission = async () => {
                const currentValue = row.permissions[permission];
                const newValue = !currentValue;
          
                try {
                  // Llamas a la API para cambiar el permiso
                  await changeHelperPermissions(
                    row.uuid,
                    row._id,
                    row.creator_id,
                    { permissions: { [permission]: newValue } }
                  );
          
                  // Actualizar estado localmente para reflejar el cambio en la UI
                  setTeachers((prevTeachers) =>
                    prevTeachers.map((teacher) =>
                      teacher._id === row._id
                        ? {
                            ...teacher,
                            permissions: {
                              ...teacher.permissions,
                              [permission]: newValue,
                            },
                          }
                        : teacher
                    )
                  );
                } catch (error) {
                  console.error('Error setting permissions:', error);
                  alert("Error updating permission. Please try again.");
                }
              };
          
              return (
                <Box
                  width="80%"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    backgroundColor: row.permissions[permission] ? colors.greenAccent[600] : colors.grey[600],
                    margin: "10px auto",
                    cursor: "pointer",
                  }}
                  borderRadius="4px"
                  onClick={handleTogglePermission}
                >
                  {row.permissions[permission] ? <ThumbUpAltOutlinedIcon /> : <BlockOutlinedIcon />}
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {row.permissions[permission] ? "allowed" : "disallowed"}
                  </Typography>
                </Box>
              );
            },
          })),
          { field: "remove", headerName: "Remove", headerAlign: "left", flex: 2, renderCell: (params) => (
            <Box
              width="80%"
              p="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="4px"
              style={{
                backgroundColor: colors.redAccent[600],
                margin: "10px auto",
                cursor: "pointer",
              }}>
                <RemoveCircleOutlineOutlinedIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    Remove
                  </Typography>
              </Box>
          )
          }
      ];

    return (
        <Box m="20px">
            <Header title="AUXILIARY TEACHERS" subtitle="Managing the Aux Teachers" />

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
                    rows={teachers}
                    columns={columns}
                    getRowId={(row) => row._id + "-" + row.uuid}
                    loading={loading}
                    showToolbar
                />

            </Box>
        </Box>
    )

}

export default AuxTeachers;