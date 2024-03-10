import {Contract, ProviderInterface, typedData, WeierstrassSignatureType} from "starknet";

// Backend simulation. Reusing provider here for ease of development
class Backend {
    private readonly provider: ProviderInterface;

    constructor(provider: ProviderInterface) {
        this.provider = provider;
    }

    async checkMessage(accountAddress: string, message: any, signature: WeierstrassSignatureType) {
        const compiledAccount = await this.provider.getClassAt(accountAddress);
        const contractAccount = new Contract(compiledAccount.abi, accountAddress, this.provider);
        const msgHash5 = typedData.getMessageHash(message, accountAddress);
        let result5: boolean;
        try {
            await contractAccount.isValidSignature(msgHash5, signature);
            result5 = true;
        } catch {
            result5 = false;
        }

        return result5;
    }
}

export default Backend;