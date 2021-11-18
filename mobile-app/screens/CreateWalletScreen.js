import 'react-native-get-random-values'
import React from 'react';
import {Button} from "react-native";
import {createWallet} from "../api/wallet";
import AppView from "../components/AppView";

export default function CreateWalletScreen({navigation}) {

    const generateWallet = () => {
        createWallet().then(() => {
            navigation.navigate('Receive')
        })
    };
    return (
        <AppView>
            <Button
                title="Create your wallet"
                onPress={() => generateWallet()}
            />
        </AppView>
    )
}


