import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { setOrigin } from '../features/navSlice';
import { setDestination } from '../features/navSlice';

const data = [
    {
        id: 1,
        icon: "home",
        location: "Home",
        destination: "Muktar El Yakub Place, Zakaria Maimalari Street, Abuja, Nigeria",
    },
    {
        id: 2,
        icon: "briefcase",
        location: "Work",
        destination: "NNPC Towers, 190, Abuja, Nigeria"
    },
];

const NavFavourites = ({ address }) => {
    const dispatch = useDispatch();

    const setAddress = (data) => {
        if (address == "origin") {
            dispatch(setOrigin(data))
        } else {
            dispatch(setDestination(data))
        }
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View
                    className="bg-gray-200 h-0.5"
                />
            )}
            renderItem={({ item: { icon, location, destination } }) => (
                <TouchableOpacity className="flex-row items-center p-5"
                // onPress={() => setAddress(destination)}
                >
                    <Icon
                        className="mr-4 rounded-full bg-gray-300 p-3"
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text className="font-semibold text-lg">{location}</Text>
                        <Text className="text-gray-500 pr-10">{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavourites;