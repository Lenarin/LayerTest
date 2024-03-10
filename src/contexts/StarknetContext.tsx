import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {Account, ProviderInterface, shortString, TypedData, WeierstrassSignatureType} from 'starknet';
import {connect, disconnect} from "starknetkit";

// @ts-ignore
import {StarknetWindowObject} from "get-starknet-core/dist/StarknetWindowObject";

interface IStarknetContext {
    provider?: ProviderInterface
    account?: Account
    chainId?: string
    connectWithArgent: () => unknown
    disconnectWithArgent: () => unknown
    signMessage: (message: string) => Promise<{typedData: TypedData, sign: WeierstrassSignatureType}>
}

const StarknetContext = createContext<IStarknetContext | null>(null)

const getTypedData = (message: string, chainId: string): TypedData  => ({
    types: {
        StarkNetDomain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'felt' },
            { name: 'chainId', type: 'felt' },
        ],
        Message: [
            { name: 'message', type: 'string' }
        ],
    },
    primaryType: 'Message',
    domain: {
        name: 'Test dapp',
        version: '1',
        chainId: shortString.encodeShortString(chainId),
    },
    message: {
        message: message
    }
})

export const StarknetProvider: FC<PropsWithChildren> = ({ children }) => {
    const [wallet, setWallet] = useState<StarknetWindowObject | null>(null)

    const connectWithArgent = async () => {
        const connection = await connect({ dappName: 'Test app' })

        if (connection && connection.wallet) {
            setWallet(connection.wallet)
        }
    }

    const disconnectWithArgent = async () => {
        await disconnect({ clearLastWallet: true })
        setWallet(null);
    }

    useEffect(() => {
        connectWithArgent()
    }, []);

    const signMessage = async (message: string) => {
        if (!wallet) throw new Error('Tried to sign message without authorization')
        const typedData = getTypedData(message, wallet.chainId)
        const signature2 = (await wallet.account.signMessage(typedData)) as WeierstrassSignatureType;

        return { typedData: typedData, sign: signature2 }
    }

    const contextValue = useMemo(() => ({
        provider: wallet?.provider,
        account: wallet?.account,
        chainId: wallet?.chainId,
        connectWithArgent,
        disconnectWithArgent,
        signMessage,
    }), [wallet])

    return <StarknetContext.Provider value={contextValue}>
        {children}
    </StarknetContext.Provider>
}

export const useStarknet = () => {
    const value = useContext(StarknetContext);
    if (!value) {
        throw new Error('No starknet context found')
    }

    return value;
}