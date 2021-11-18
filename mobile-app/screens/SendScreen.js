import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QrBorder from '../assets/qr-border.png';
import AppView from '../components/AppView';
import CustomButton from '../components/CustomButton';
import {sendToken} from "../api/token";
import {sanitize} from "../api/wallet";

const useStyles = ({ width, qrSize }) => ({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
    },
    description: {
        fontSize: width * 0.09,
        marginTop: 10,
        textAlign: 'center',
        width: '70%',
        color: 'white',
    },
    cancel: {
        position: 'absolute',
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '70%',
        color: 'white',
        bottom: 20
    },
    textInput: {
        color: 'white',
        fontSize: width * 0.09,
        textAlign: 'center',
        marginBottom: 20
    },
    confirmationText: {
        color: 'white',
        fontSize: width * 0.09,
        textAlign: 'center'
    },
    marginBottom20: {
        marginBottom: 20
    }
});

export default function SendScreen({ navigation }) {
    const { width } = Dimensions.get('window')
    const qrSize = width * 0.7

    const styles = useStyles({ width, qrSize });

    const [hasPermission, setHasPermission] = useState(null);
    const [sentTo, setSendTo] = useState(null);
    const [amount, setAmount] = useState('0');
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleQRCodeScanned = ({ data }) => {
        if (!sentTo) {
            setSendTo(data);
        }
    };

    const handleSendAmount = () => {
        sendToken(sanitize(sentTo), parseInt(amount));
        setIsSent(true);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <AppView>
            {!sentTo && !isSent ? <>
                <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={handleQRCodeScanned}
                    style={[StyleSheet.absoluteFill, styles.container]}
                >
                    <Text style={styles.description}>
                        Scan QR code
                    </Text>
                    <Image style={styles.qr} source={QrBorder} />
                    <Text onPress={() => navigation.navigate('Home')} style={styles.cancel}>
                        Cancel
                    </Text>
                </BarCodeScanner>
            </> : null}
            {sentTo && !isSent ? <>
                <TextInput
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={(text)=> setAmount(text)}
                    value={amount}
                    maxLength={10}
                />
                <CustomButton basedOnWidth={width} onPress={handleSendAmount}>
                    Send ti$m
                </CustomButton>
            </> : null}

            {isSent ? <>
                <Text  style={styles.confirmationText}>Sent {amount} ti$m to</Text>
                <Text  style={[styles.confirmationText, styles.marginBottom20]}>{sentTo}</Text>
                <CustomButton basedOnWidth={width} onPress={() => navigation.navigate('Home')}>
                    Understood
                </CustomButton>
            </> : null}
        </AppView>
    )
}
