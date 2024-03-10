import {FC, useState} from "react";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useStarknet} from "../contexts/StarknetContext.tsx";
import Backend from "../backend/backend.ts";
import {useSnackbar} from "notistack";

const Dashboard: FC = () => {
    const { account, signMessage, chainId, provider } = useStarknet()
    const { enqueueSnackbar } = useSnackbar();

    const [message, setMessage] = useState<string>('')

    const handleSend = async (message: string, corrupt?: boolean) => {
        if (!provider || !account) throw new Error('No provider or account available!')
        try {
            const {typedData, sign} = await signMessage(message);

            if (corrupt) {
                typedData.message.message += 'CORRUPTED'
            }

            // Creating backend here to simplify test task
            const backend = new Backend(provider)
            const accepted = await backend.checkMessage(account.address, typedData, sign);
            if (accepted) {
                enqueueSnackbar('Message signed and sent successfully.', {variant: "success"})
            } else {
                enqueueSnackbar('Message signed and sent but was rejected by backend.', {variant: "error"})
            }
        } catch (e) {
            enqueueSnackbar((e as Error).message, {variant: "error"})
        }
    }

    return <Paper>
        <Stack textAlign='center' padding="32px" spacing={6} >
            <Typography variant="h5">
                Hi there. You are logged in.
            </Typography>
            <Typography variant="h6" noWrap>
                Address: {account?.address}<br/>
                Chain: {chainId}
            </Typography>
            <Stack>
                <TextField label='Message' value={message} onChange={e => setMessage(e.target.value)} />
                <Stack
                    justifyContent='center'
                    direction='row'
                    spacing={2}
                >
                    <Button onClick={() => handleSend(message)}>
                        Send Message
                    </Button>
                    <Button onClick={() => handleSend(message, true)}>
                        Send Corrupted message
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    </Paper>
}

export default Dashboard