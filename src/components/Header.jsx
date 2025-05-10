// import { Typography, Box, useTheme } from "@mui/material";
// import { tokens } from "../theme";

// const Header = ({ title, subtitle, center=false }) => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     return (
//         <Box textAlign={center ? "center" : "left"}>
//             <Typography 
//                 variant="h2" 
//                 color={colors.grey[100]} 
//                 fontWeight="bold" 
//                 sx={{ mb: "5px"}}
//             >
//                 {title}
//             </Typography>
//             <Typography
//                 variant="h5" 
//                 color={colors.greenAccent[400]} 
//             >
//                 {subtitle}
//             </Typography>
//         </Box>
//     )
// }

// export default Header;

import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, center = false, action = null }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box 
            display="flex" 
            justifyContent={center ? "center" : "space-between"} 
            alignItems="center" 
            mb="20px"
        >
            <Box textAlign={center ? "center" : "left"}>
                <Typography 
                    variant="h2" 
                    color={colors.grey[100]} 
                    fontWeight="bold" 
                    sx={{ mb: "5px"}}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h5" 
                    color={colors.greenAccent[400]} 
                >
                    {subtitle}
                </Typography>
            </Box>
            {action && (
                <Box>
                    {action}
                </Box>
            )}
        </Box>
    )
};

export default Header;