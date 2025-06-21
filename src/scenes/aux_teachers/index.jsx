import {Box, useTheme, Typography} from "@mui/material";
import {tokens} from "../../theme";
import { DataGrid, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { requestHelperPermissions, changeHelperPermissions } from "../../api/courses";
import { useEffect, useState } from "react";
import { mockTeachers } from "../../mockData/mockTeachers"; // Mock data for testing, remove when connected to backend
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useData } from "../../context/DataContext";

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
    const [loadingPermissions, setLoadingPermissions] = useState({});
    const { users, courses, refreshData } = useData();

    useEffect(() => {
      if (!users || !courses) {
        refreshData();
      }
    },[users, courses, refreshData]);


    useEffect(() => {
      if (!users || !courses) return;
      
      const loadTeachers = async () => {
        try {
          const rowsPromises = [];
      
          for (const course of courses) {
            if (!course.assistants || course.assistants.length === 0) continue;

            for (const assistantId of course.assistants) {
              const user = users.find(u => u.uuid === assistantId);
      
              rowsPromises.push(
                requestHelperPermissions(assistantId, course._id).then((permissions) => ({
                  courseId: course._id,
                  courseName: course.name,
                  creatorId: course.creator_id,
                  assistantId,
                  assistantName: user?.name +" "+ user?.surname || "Unknown",
                  permissions,
                }))
              );
            }
          }
      
          const assistantRows = await Promise.all(rowsPromises);
          setTeachers(assistantRows);
        } catch (error) {
          console.error("Error loading data", error);
        } finally {
          setLoading(false);
        }
      };
      loadTeachers();
    }, [users, courses]);


      const columns = [
        { field: "rowNumber", headerName: "#", flex: 0.5, headerAlign: "left", renderCell: (params) =>
            `${params.api.getAllRowIds().indexOf(params.id) + 1}`},
        { field: "courseId", headerName: "Course ID", type:"number", headerAlign: "left", flex: 1},
        { field: "courseName", headerName: "Course Name", flex: 2, cellClassName: "name-column--cell"},
        { field: "assistantId", headerName: "Teacher ID", type:"number", headerAlign: "left", flex: 1},
        { field: "assistantName", headerName: "Teacher Name", flex: 2, cellClassName: "name-column--cell"},
        ...permissions.map((permission) => ({
            field: permission,
            headerName: permission === 'ModulesAndResources' ? 'Modules and Resources' : permission,
            flex: 2,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
              const handleTogglePermission = async () => {

                const currentValue = row.permissions[permission];

                if (currentValue) {
                const confirmed = window.confirm(`Are you sure you want to remove ${row.assistantName}'s ${permission} permissions?`);
                if (!confirmed) return;
              } else {
                const confirmed = window.confirm(`Are you sure you want to give ${row.assistantName}'s ${permission} permissions?`);
                if (!confirmed) return;
              }


                const key = `${row.courseId}-${row.assistantId}`;
                setLoadingPermissions(prev => ({ ...prev, [key]: true }));

                const newValue = !currentValue;
          
                try {
                  await changeHelperPermissions(
                    row.assistantId,
                    row.courseId,
                    row.creatorId,
                    { [permission]: newValue }
                  );
                  console.log(permission,":",newValue);
          
                  setTeachers((prevTeachers) =>
                    prevTeachers.map((teacher) =>
                      teacher.assistantId === row.assistantId && teacher.courseId === row.courseId
                        ? { ...teacher, permissions: { ...teacher.permissions, [permission]: newValue } }
                        : teacher
                    )
                  
                  );
                } catch (error) {
                  console.error('Error setting permissions:', error);
                  alert("Error updating permission. Please try again.");
                } finally {
                  setLoadingPermissions(prev => ({ ...prev, [key]: false }));
                }

              };

              const isLoading = loadingPermissions[`${row.courseId}-${row.assistantId}`] || false;
          
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
                    cursor: isLoading ? "wait" : "pointer",
                    opacity: isLoading ? 0.6 : 1,
                    pointerEvents: isLoading ? "none" : "auto",
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
                    getRowId={(row) => row.courseId + "-" + row.assistantId}
                    loading={loading}
                    showToolbar
                />

            </Box>
        </Box>
    )

}

export default AuxTeachers;