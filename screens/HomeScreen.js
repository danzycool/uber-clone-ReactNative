import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavOptions from '../components/NavOptions';

const HomeScreen = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <View className="p-5">
                <Image
                    source={require('../assets/uber-logo.png')}
                    style={{ height: 100, width: 100, resizeMode: "contain" }}
                />
                <NavOptions />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})