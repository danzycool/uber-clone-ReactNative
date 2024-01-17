import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../features/navSlice';


const data = [
    {
        id: 123,
        title: "Get a Ride",
        image: require("../assets/car.webp"),
        screen: "MapScreen"
    },
    {
        id: 124,
        title: "Order Food",
        image: require("../assets/food.png"),
        screen: "EatScreen"
    }
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="pl-6 pb-8 pt-4 bg-gray-200 m-2 w-35"
                    onPress={() => navigation.navigate(item.screen)}
                    disabled={!origin}
                >
                    <View className={!origin && "opacity-20"}>
                        <Image
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                            source={item.image}
                        />
                        <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
                        <Icon
                            className="p-2 bg-black rounded-full w-10 mt-4"
                            name="arrowright" color="white" type="antdesign"
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions
