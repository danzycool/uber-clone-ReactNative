import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';

import NavOptions from '../components/NavOptions';
import { setDestination, setOrigin } from '../features/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="p-5">
                <Image
                    source={require('../assets/uber-logo.png')}
                    style={{ height: 100, width: 100, resizeMode: "contain" }}
                />
                <GooglePlacesAutocomplete
                    placeholder='Where From?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    onPress={(data, details = null) => {
                        console.log(data);
                        console.log(details);

                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }));

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    enablePoweredByContainer={false}
                    minLength={2}
                />
                <NavOptions />
                <NavFavourites address="origin" />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({})