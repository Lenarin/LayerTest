import {FC} from "react";
import {Button, Toolbar, Typography} from "@mui/material";
import {useStarknet} from "../contexts/StarknetContext.tsx";
import AuthMenu from "./AuthMenu.tsx";

const Header: FC = () => {
    const { connectWithArgent, account, disconnectWithArgent } = useStarknet()

    return <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test App
        </Typography>
        {account
            ? <AuthMenu account={account} onLogoutClick={disconnectWithArgent} />
            : <Button onClick={connectWithArgent}>
                Login
            </Button>}

    </Toolbar>
}

export default Header;