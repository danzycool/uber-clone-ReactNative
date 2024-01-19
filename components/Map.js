import { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from 'react-native-maps-directions';

import { selectOrigin, selectDestination } from '../features/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"],
            {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
            },
        );
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || destination) return;

        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destination=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        }
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