import 'react-native-get-random-values'
import {ethers, Wallet} from "ethers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { entropyToMnemonic } from "ethers/lib/utils";

export const Network = {
    test: "wss://ropsten.infura.io/ws/v3/273830d3ff9f45428bdbbd6b381ec0be",
    local: "ws://localhost:8545"
}
const PRIVATE_KEY_STORAGE_KEY = 'Ethereum.privatekey';
export const PUBLIC_KEY_STORAGE_KEY = 'Ethereum.publickey';

export function getProvider() {
    return new ethers.getDefaultProvider(Network.test);
}

export async function createWallet() {
    console.log("Creating Wallet")
    const wallet = Wallet.createRandom()
    console.log("Created Wallet")
    console.log(wallet)
    await AsyncStorage.setItem(PRIVATE_KEY_STORAGE_KEY, JSON.stringify(wallet.privateKey))
    await AsyncStorage.setItem(PUBLIC_KEY_STORAGE_KEY, JSON.stringify(await wallet.getAddress()))
}

export async function getWalletAddress() {
    return AsyncStorage.getItem(PUBLIC_KEY_STORAGE_KEY)
}

export async function loadWallet(provider) {
    return AsyncStorage.getItem(PRIVATE_KEY_STORAGE_KEY).then((pk) => {
        console.log("Got PK")
        console.log("PK exists")
        const sanitizedKey = sanitize(pk)
        console.log(sanitizedKey)
        return new ethers.Wallet(sanitizedKey, provider)
    })
}

export function sanitize(key) {
    if (!key) return;
    return String(key ?? "").replace(/"/g, '')
}


function loadWalletFromMnemonics(mnemonics) {
    if (!(mnemonics instanceof Array)) throw new Error('invalid mnemonic');
    const provider = new ethers.getDefaultProvider(Network.test);
    provider.getBalance = provider.getBalance.bind(provider);
    return new ethers.Wallet("", provider);
}

const generateMnemonics = () => {
    return entropyToMnemonic(ethers.utils.randomBytes(16)).split(' ');
}