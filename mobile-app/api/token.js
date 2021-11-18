import 'react-native-get-random-values'
import {BigNumber, ethers} from "ethers";
import {loadWallet, Network} from "./wallet";

const TOKEN = {
    address: '0xaaF88f07bb06Df60293Be841768416D68defE299'
}


export function loadTokenBalance(walletAddress) {
    const provider = new ethers.getDefaultProvider(Network.test);
    provider.getBalance = provider.getBalance.bind(provider);
    const contract = getContract(provider)
    return contract.balanceOf(walletAddress)
}

export function sendToken(toAddress, amount) {
    // const itx = new ethers.providers.InfuraProvider(
    //     'ropsten',
    //     '273830d3ff9f45428bdbbd6b381ec0be'
    // )
    const provider = ethers.providers.getDefaultProvider(Network.test)
    loadWallet(provider).then((signerWallet) => {
        console.log("Init ITX and signer")
        const contract = getContract(signerWallet)
        console.log("Transfering now to " + toAddress)
        contract.transfer(toAddress, BigNumber.from(amount))
        console.log("Transfer sent")
    })
}

export function getContract(providerOrSigner) {
    const abi = '[\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [],\n' +
        '\t\t"name": "name",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "string"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "spender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "amount",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "approve",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [],\n' +
        '\t\t"name": "totalSupply",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "sender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "recipient",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "amount",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "transferFrom",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "spender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "addedValue",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "increaseAllowance",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "account",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "balanceOf",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [],\n' +
        '\t\t"name": "owner",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [],\n' +
        '\t\t"name": "symbol",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "string"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "spender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "subtractedValue",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "decreaseAllowance",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_newOwner",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "changeOwner",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_to",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_value",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "transfer",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [],\n' +
        '\t\t"name": "etherBalance",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_value",\n' +
        '\t\t\t\t"type": "int256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "modifyTotalSupply",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "New_totalSupply",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": true,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "owner",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "spender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "allowance",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "view",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"constant": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_to",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_value",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "initialTransfer",\n' +
        '\t\t"outputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "success",\n' +
        '\t\t\t\t"type": "bool"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "function"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"name": "_initialSupply",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"payable": false,\n' +
        '\t\t"stateMutability": "nonpayable",\n' +
        '\t\t"type": "constructor"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"anonymous": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": true,\n' +
        '\t\t\t\t"name": "from",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": true,\n' +
        '\t\t\t\t"name": "to",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": false,\n' +
        '\t\t\t\t"name": "value",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "Transfer",\n' +
        '\t\t"type": "event"\n' +
        '\t},\n' +
        '\t{\n' +
        '\t\t"anonymous": false,\n' +
        '\t\t"inputs": [\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": true,\n' +
        '\t\t\t\t"name": "owner",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": true,\n' +
        '\t\t\t\t"name": "spender",\n' +
        '\t\t\t\t"type": "address"\n' +
        '\t\t\t},\n' +
        '\t\t\t{\n' +
        '\t\t\t\t"indexed": false,\n' +
        '\t\t\t\t"name": "value",\n' +
        '\t\t\t\t"type": "uint256"\n' +
        '\t\t\t}\n' +
        '\t\t],\n' +
        '\t\t"name": "Approval",\n' +
        '\t\t"type": "event"\n' +
        '\t}\n' +
        ']'
    const contract = new ethers.Contract(TOKEN.address, abi, providerOrSigner);
    return contract.connect(providerOrSigner);
}
