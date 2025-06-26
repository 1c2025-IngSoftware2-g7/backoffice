import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useData } from "../../context/DataContext";

function calculateAge(birthday) {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function useAgeBins(profiles, refreshData) {
  const [bins, setBins] = useState({
    notSpecified: 0,
    lessThan15: 0,
    from15To19: 0,
    from20To24: 0,
    from25To29: 0,
    from30To34: 0,
    from35To44: 0,
    from45To54: 0,
    moreThan55: 0,
  });

  useEffect(() => {
    if (!profiles) {
      refreshData();
      return;
    }

    const newBins = {
      notSpecified: 0,
      lessThan15: 0,
      from15To19: 0,
      from20To24: 0,
      from25To29: 0,
      from30To34: 0,
      from35To44: 0,
      from45To54: 0,
      moreThan55: 0,
    };

    for (const profile of profiles) {
      if (!profile.birthday) {
        newBins.notSpecified++;
        continue;
      }

      const age = calculateAge(profile.birthday);

      if (age < 15) newBins.lessThan15++;
      else if (age < 20) newBins.from15To19++;
      else if (age < 25) newBins.from20To24++;
      else if (age < 30) newBins.from25To29++;
      else if (age < 35) newBins.from30To34++;
      else if (age < 45) newBins.from35To44++;
      else if (age < 55) newBins.from45To54++;
      else newBins.moreThan55++;
    }

    setBins(newBins);
  }, [profiles, refreshData]);

  return bins;
}

const AgesDistributionBarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { profiles, refreshData } = useData();
  const bins = useAgeBins(profiles, refreshData);

  return (
    <Box
      gridColumn="span 9"
      gridRow="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height="250px"
      padding="20px"
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Users Registered
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.greenAccent[500]}
        >
          Age Distribution
        </Typography>
      </Box>

      <Box flex="1" ml={4}>
        <BarChart bins={bins} />
      </Box>
    </Box>
  );
};

export default AgesDistributionBarChart;

const BarChart = ({ bins }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { label: "Not Specified", value: bins.notSpecified },
    { label: "<15", value: bins.lessThan15 },
    { label: "15-19", value: bins.from15To19 },
    { label: "20-24", value: bins.from20To24 },
    { label: "25-29", value: bins.from25To29 },
    { label: "30-34", value: bins.from30To34 },
    { label: "35-44", value: bins.from35To44 },
    { label: "45-55", value: bins.from45To54 },
    { label: "55>", value: bins.moreThan55 },
  ];

  return (
    <div style={{ height: 250 }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="label"
        groupMode="grouped"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={colors.greenAccent[500]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: "Status",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          //   legend: "Users",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};
