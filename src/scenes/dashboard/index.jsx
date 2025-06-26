import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import LinkIcon from "@mui/icons-material/Link";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { use, useEffect, useState } from "react";
import UserStatusBarChart from "./UserStatusBarChart";
import { LOGS, METRICS } from "../../api/back_services";
import { useData } from "../../context/DataContext";
import CourseInscriptionBarChart from "./CourseInscriptionBarChart";
import InfoBox from "./infoBox";
import AgesDistributionBarChart from "./AgesChart";
import { useLocation } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function getTotalAdmins(users) {
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  return totalAdmins;
}

function getTotalUsers(users) {
  const totalUsers = users.filter((user) => user.role !== "admin").length;
  return totalUsers;
}

function getTotalInactive(users) {
  const totalInactive = users.filter(
    (user) => user.status === "inactive" && user.role !== "admin"
  ).length;
  return totalInactive;
}

function getTotalActive(users) {
  const totalActive = users.filter(
    (user) =>
      (user.status === "active" || user.status === "enabled") &&
      user.role !== "admin"
  ).length;
  return totalActive;
}

function getTotalUnverified(users) {
  const totalActive = users.filter(
    (user) => user.status === "unverified" && user.role !== "admin"
  ).length;
  return totalActive;
}

function getTotalUsersWithoutProfile(totalUsers, profiles) {
  const cant_profiles = profiles ? profiles.length : 0;
  return totalUsers - cant_profiles;
}

function getPercentageActiveNotifs(users, totalUsers) {
  if (totalUsers === 0) return 0;

  const cant_active = users.filter((user) => user.notification === true).length;
  return Math.round((cant_active / totalUsers) * 100);
}

function getPercentageActiveBiometrics(users, totalUsers) {
  if (totalUsers === 0) return 0;

  const cant_bio = users.filter((user) => user.id_biometric !== null).length;
  return Math.round((cant_bio / totalUsers) * 100);
}

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { users, courses, profiles, refreshData } = useData();
  const location = useLocation();

  const [totalUsers, setTotalUsers] = useState(null);
  const [totalCourses, setTotalCourses] = useState(null);
  const [totalAdmins, setTotalAdmins] = useState(null);
  const [totalProfileError, setTotalProfileError] = useState(null);
  const [totalInactive, setTotalInactive] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalUnverified, setTotalUnverified] = useState(0);
  const [percentageActiveNotifs, setPercentageActiveNotifs] = useState(null);
  const [percentageActiveBiometrics, setPercentageActiveBiometrics] =
    useState(null);

  useEffect(() => {
    if (!users || !courses) {
      refreshData();
    }
  }, [users, courses, refreshData]);

  useEffect(() => {
    refreshData();
  }, [location.pathname]);

  useEffect(() => {
    if (!users || !Array.isArray(users)) return;

    const totalUsersVal = getTotalUsers(users);
    const totalAdminsVal = getTotalAdmins(users);

    setTotalUsers(totalUsersVal);
    setTotalAdmins(totalAdminsVal);
    setTotalInactive(getTotalInactive(users));
    setTotalActive(getTotalActive(users));
    setTotalUnverified(getTotalUnverified(users));

    if (Array.isArray(profiles)) {
      setTotalProfileError(
        getTotalUsersWithoutProfile(totalUsersVal, profiles)
      );
    }

    setPercentageActiveNotifs(getPercentageActiveNotifs(users, totalUsersVal));
    setPercentageActiveBiometrics(
      getPercentageActiveBiometrics(users, totalUsersVal)
    );
  }, [users, profiles]);

  useEffect(() => {
    if (!courses) return;

    setTotalCourses(courses.length);
  }, [courses]);

  const handleSeeLogs = () => {
    window.open(LOGS, "_blank");
  };

  const handleSeeMetrics = () => {
    window.open(METRICS, "_blank");
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
              marginRight: "20px",
            }}
            onClick={handleSeeMetrics}
          >
            <TimelineOutlinedIcon sx={{ mr: "10px" }} />
            See Metrics
          </Button>
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
        <InfoBox
          title={totalAdmins ?? "loading..."}
          subtitle="Total Admins"
          icon={
            <AdminPanelSettingsIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <InfoBox
          title={totalUsers ?? "loading..."}
          subtitle="Total Users"
          icon={
            <PersonIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <InfoBox
          title={totalCourses ?? "loading..."}
          subtitle="Total Courses"
          icon={
            <ClassIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
        <InfoBox
          title={totalProfileError ?? "loading..."}
          subtitle="Users without Profile"
          error={true}
          icon={
            <ErrorOutlinedIcon
              sx={{ color: colors.redAccent[600], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
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
          <UserStatusBarChart
            active={totalActive}
            inactive={totalInactive}
            unverified={totalUnverified}
          />
        </Box>
        <CourseInscriptionBarChart />

        {/* ROW 3 */}
        <AgesDistributionBarChart />

        <InfoBox
          title={
            percentageActiveNotifs !== null
              ? percentageActiveNotifs + "%"
              : "loading..."
          }
          subtitle="Activated Notifications"
          icon={
            <NotificationsActiveIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />

        <InfoBox
          title={"CHECK"}
          subtitle="Activated Biometrics"
          icon={
            <ClassIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
