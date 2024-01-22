import { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

import { selectOrigin, selectDestination, setTravelTimeInformation } from '../features/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // Add fitToSuppliedMarkers in setTimeout to fix performance issue
        setTimeout(() => {
            // Zoom and fit to markers
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"],
                {
                    edgePadding: {
                        top: 70,
                        right: 50,
                        bottom: 70,
                        left: 50,
                    },
                    "animated": true,
                },
            );
        }, 1000);

    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&destinations=${destination.description}&origins=${origin.description}&key=${GOOGLE_MAPS_APIKEY}`
            ).then((res) => res.json()
            ).then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])

    return (
        <MapView
            ref={mapRef}
            className="flex-1"
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
}

export default Map