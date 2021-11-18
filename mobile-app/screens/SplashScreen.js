import * as React from 'react';
import {Dimensions, Text} from 'react-native';
import AppView from "../components/AppView";
import CustomButton from "../components/CustomButton";
import {useEffect} from "react";
import {getWalletAddress} from "../api/wallet";

const styles = {
    text: {
        backgroundColor: 'transparent',
        fontSize: 55,
        color: '#fff',
        fontWeight: '700'
    },
};

export default function SplashScreen({ navigation }) {
    const { width } = Dimensions.get('window')

    const [isFetched, setIsFetched] = React.useState(false);
    const [hasWallet, setHasWallet] = React.useState(false);

    useEffect(() => {
        getWalletAddress().then((addr) => {
            if (addr) {
                setHasWallet(true);
                navigation.navigate('Home');
            }
            setIsFetched(true);
        })
    }, []);

    return (
        <AppView>
            <Text style={styles.text}>
                ti$m
            </Text>

            {!hasWallet && isFetched ? <CustomButton basedOnWidth={width} onPress={() => navigation.navigate('CreateWallet')}>
                Create ti$m wallet
            </CustomButton> : null}
        </AppView>
    );
}
