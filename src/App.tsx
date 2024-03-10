import './App.css'
import {AppBar, Box, Container, Stack} from "@mui/material";
import Header from "./components/Header.tsx";
import {useStarknet} from "./contexts/StarknetContext.tsx";
import AskAuthCard from "./components/AskAuthCard.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {
    const { account } = useStarknet()

    return (
        <Stack spacing={8}>
            <AppBar position="static">
                <Container maxWidth='lg'>
                    <Header />
                </Container>
            </AppBar>
            <Box component="main" minWidth='100%' minHeight='100%'>
                <Container maxWidth='lg'>
                    {account ? <Dashboard /> : <AskAuthCard />}
                </Container>
            </Box>
        </Stack>
    )
}

export default App
