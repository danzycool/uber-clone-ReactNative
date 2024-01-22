import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import formatter from '../features/numberFormatter';
import { selectTravelTimeInformation } from '../features/navSlice';


const data = [
    {
        id: "Uber-X",
        title: "UberX",
        multiplier: 1,
        image: require('../assets/UberX.webp')
    },
    {
        id: "Uber-XL",
        title: "Uber XL",
        multiplier: 1.2,
        image: require('../assets/UberXL.webp')
    },
    {
        id: "Uber-LUX",
        title: "Uber LUX",
        multiplier: 1.75,
        image: require('../assets/Lux.webp')
    }
];

// During peak traffic
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInfo = useSelector(selectTravelTimeInformation);

    const distanceFormat = (data) => {
        if (!data) {
            return;
        } else {
            if (data.includes("mi")) {
                data = data.replace("mi", "mile(s)")
            }
        }
        return data;
    }

    return (
        <SafeAreaView className="bg-white flex-grow">
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    className="absolute top-3 left-5 z-50 p-3 rounded-full"
                >
                    <Icon
                        name="chevron-left"
                        type='fontawesome'
                    />
                </TouchableOpacity>
                <Text className="text-center py-5 text-xl">Select a Ride - {distanceFormat(travelTimeInfo?.distance?.text)}</Text>
            </View>
            <FlatList
                className="-mt-5"
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        className={`flex-row items-center justify-between px-5 ${id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            source={image}
                        />
                        <View className="-ml-6">
                            <Text className="text-xl font-semibold">{title}</Text>
                            <Text>{travelTimeInfo?.duration?.text} Travel Time</Text>
                        </View>
                        <Text>{formatter(travelTimeInfo?.duration.value * SURGE_CHARGE_RATE * multiplier / 100)}</Text>
                    </TouchableOpacity>
                )}
            />
            <View>
                <TouchableOpacity disabled={!selected}
                    className={`bg-black py-2 mx-3 mb-1 ${!selected && 'bg-gray-300'}`}
                >
                    <Text className="text-center text-white text-xl">Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard