import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

import { setDestination } from '../features/navSlice';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Text className="text-center py-5 text-xl">Good day, Daniel</Text>
            <View className="border-t border-gray-200 flex-shrink">
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='where to?'
                        styles={inputBoxStyles}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description,
                            }));

                            navigation.navigate("RideOptionsCard");
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                    />
                </View>
                <NavFavourites />
            </View>
            <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
                <TouchableOpacity
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    className="flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full"
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text className="text-white text-center">Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex flex-row justify-between w-24 px-4 py-3 rounded-full"
                >
                    <Icon
                        name="fast-food-outline"
                        type="ionicon"
                        color="black"
                        size={16}
                    />
                    <Text className="text-center">Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard;

const inputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})