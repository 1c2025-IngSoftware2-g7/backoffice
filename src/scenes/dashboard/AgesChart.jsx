import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

const AgesDistributionBarChart = ({ averages }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <BarChart
          zero={0}
          ten={0}
          twenty={5}
          thirty={10}
          fourty={15}
          fifty={20}
          sixty={20}
          seventy={15}
          eighty={10}
        />
      </Box>
    </Box>
  );
};

export default AgesDistributionBarChart;

const BarChart = ({
  zero,
  ten,
  twenty,
  thirty,
  fourty,
  fifty,
  sixty,
  seventy,
  eighty,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { label: "<15", value: zero },
    { label: "15-19", value: ten },
    { label: "20-24", value: twenty },
    { label: "25-29", value: thirty },
    { label: "30-34", value: fourty },
    { label: "34-39", value: fifty },
    { label: "40-49", value: sixty },
    { label: "50-59", value: seventy },
    { label: "60>", value: eighty },
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
