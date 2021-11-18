import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const useStyles = ({ width }) => ({
    button: {
        width: width * 0.5,
        padding: width * 0.01,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: width * 0.05,
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default function CustomButton({ basedOnWidth, onPress, children }) {
    const styles = useStyles({ width: basedOnWidth  });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    )
}
