import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import BackgroundImage from '../assets/image-background.png';

const styles = {
    view: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
        justifyContent: "center"
    },
};

const AppView = ({ children }) => (
    <View style={styles.view}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.imageBackground}>
            {children}
        </ImageBackground>
    </View>
);

export default AppView;