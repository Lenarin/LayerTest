import {Account} from "starknet";
import {FC, useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {truncateMiddle} from "../utils/truncateMiddle.ts";

interface IAuthMenuProps {
    account: Account
    onLogoutClick: () => unknown
}

const AuthMenu: FC<IAuthMenuProps> = ({ account, onLogoutClick }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="auth-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {truncateMiddle(account.address, 16, '...')}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'auth-button',
                }}
            >
                <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default AuthMenu;