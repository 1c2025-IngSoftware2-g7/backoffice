import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import ForumIcon from '@mui/icons-material/Forum';
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/courses";
import { getAllUsers } from "../../api/users";
import UserStatusBarChart from "./UserStatusBarChart";
import { mockUsers } from "../../mockData/mockUsers";


function getTotalAdmins(users) {
  const totalAdmins = users.filter(user => user.role === "admin").length;
  return totalAdmins;
}

function getTotalInactive(users) {
  const totalInactive = users.filter(user => user.status === "inactive" && user.role !== "admin").length;
  return totalInactive;
}

function getTotalActive(users) {
  const totalActive = users.filter(user => user.status === "active" && user.role !== "admin").length;
  return totalActive;
}

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalCourses, setTotalCourses] = useState("loading...");
  const [totalUsers, setTotalUsers] = useState("loading...");
  const [totalForums, setTotalForums] = useState("loading...");
  const [totalAdmins, setTotalAdmins] = useState("loading...");
  const [totalInactive, setTotalInactive] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  
      useEffect(() => {
  
          // setCourses(mockCourses); /// eliminar cuando esta conectado el back
  
          const fetchData = async () => {
              try {
                  const response = await getAllCourses();
                  setTotalCourses(response.length);
              }
               catch (error) {
                  console.error(error);
              } 
              try {
                // const response = await getAllUsers();
                const response = mockUsers; // eliminar cuando esta conectado el back
                setTotalUsers(response.length);
                setTotalAdmins(getTotalAdmins(response));
                setTotalInactive(getTotalInactive(response));
                setTotalActive(getTotalActive(response));
            }
             catch (error) {
                console.error(error);
            }
          };
      
          fetchData();
      }, []);

  const handleSeeLogs = () => {
    window.open("https://one.newrelic.com/logger?account=6733613&duration=1800000&state=c9a0123f-71bc-6113-d6d8-6d4efbbe2658", "_blank");
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleSeeLogs}
          >
            <LinkIcon sx={{ mr: "10px" }} />
            See Logs
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalAdmins}
            subtitle="Total Admins"
            // progress="0.75"
            // increase="+14%"
            icon={
              <AdminPanelSettingsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalUsers}
            subtitle="Total Users"
            // progress="0.50"
            // increase="+21%"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalCourses}
            subtitle="Total Courses"
            // progress="0.30"
            // increase="+5%"
            icon={
              <ClassIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalForums}
            subtitle="Total Forums"
            // progress="0.80"
            // increase="+43%"
            icon={
              <ForumIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Users Registered
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Distribution
              </Typography>
            </Box>
          </Box>
          <UserStatusBarChart active={totalActive} inactive={totalInactive} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;