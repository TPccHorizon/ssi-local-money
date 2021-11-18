import {getWalletAddress} from "../api/wallet";
import React, { useEffect } from 'react';
import {Button, Text, View} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function ReceiveScreen() {
    const [walletAddress, setAddress] = React.useState("test");

    useEffect(() => {
        getWalletAddress().then((storedAddress) => {
            console.log(storedAddress)
            setAddress(storedAddress)
        })
    }, []);
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Your Wallet Address</Text>
            <QRCode value={walletAddress}/>
            <Text>{walletAddress}</Text>
        </View>
    )
}