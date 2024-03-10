import {FC} from "react";
import {Box, Paper, Typography} from "@mui/material";

const AskAuthCard: FC = () => {
    return <Paper>
        <Box textAlign='center' padding="32px" >
            <Typography variant="h5">
                Please, log in from header
            </Typography>
        </Box>
    </Paper>
}

export default AskAuthCard