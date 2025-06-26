import { Box, useTheme } from "@mui/material";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";

const InfoBox = ({ title, subtitle, icon, error }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox title={title} subtitle={subtitle} icon={icon} error={error} />
    </Box>
  );
};

export default InfoBox;
