import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

const MapScreen = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <View>

            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                className="absolute top-16 left-5 bg-gray-100 z-50 p-3 rounded-full shadow-lg"
            >
                <Icon name="menu" />
            </TouchableOpacity>

            <View className="h-[45%]">
                <Map />
            </View>

            <View className="h-[55%]">
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen