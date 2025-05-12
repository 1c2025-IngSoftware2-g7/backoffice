import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const UserStatusBarChart = ({ active, inactive }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    {
      status: "",
      Active: active,
      Inactive: inactive,
    },
  ];

  return (
    <div style={{ height: 250 }}>
      <ResponsiveBar
        data={data}
        keys={["Active", "Inactive"]}
        indexBy="status"
        groupMode="grouped"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={({ id }) => (id === "Active" ? colors.greenAccent[500] : colors.redAccent[400])}
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
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default UserStatusBarChart;