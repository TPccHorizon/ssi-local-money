import React from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import {Text, View, StyleSheet, Dimensions} from "react-native";
import {getContract} from "../api/token";
import {getProvider, getWalletAddress, sanitize} from "../api/wallet";
import AppView from "../components/AppView";
import CustomButton from "../components/CustomButton";
import {useInterval} from "../components/use-interval";

const DUMMY_WALLET = 'tim';

export default function HomeScreen({navigation}) {
    const [balance, setBalance] = React.useState(0);
    const [myWalletAddress, setWalletAddress] = React.useState(DUMMY_WALLET);
    const { width } = Dimensions.get('window')

    useInterval(() => {
        const contract = getContract(getProvider());
        getWalletAddress().then((addr) => {
            const sanitizedData = sanitize(addr);
            setWalletAddress(sanitizedData);
            contract.balanceOf(sanitizedData).then(async (_balance) => {
                const tokenBalance = parseInt(_balance.toHexString());
                setBalance(tokenBalance);

                if (myWalletAddress !== DUMMY_WALLET && tokenBalance !== balance) {
                    alert(`You received ${tokenBalance - balance} ti$m`);
                }
            });
        });
    }, 1000);

    return (
        <AppView>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.heading}>ti$m Wallet</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.balanceText}>Your balance is {balance} ti$m</Text>
                </View>
                <View style={styles.walletAddressView}>
                    <SvgQRCode
                        size={200}
                        color="white"
                        backgroundColor="transparent"
                        value={myWalletAddress}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <CustomButton basedOnWidth={width} onPress={() => navigation.navigate('Send')}>
                        Send ti$m
                    </CustomButton>
                </View>
            </View>
        </AppView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    balanceText: {
        fontSize: 20,
        color: "white"
    },
    walletAddressView: {
        flex: 3,
        alignSelf: "stretch",
        fontSize: 20,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "white",
        padding: 10,
        marginLeft: 30,
        marginRight: 30
    }
});
