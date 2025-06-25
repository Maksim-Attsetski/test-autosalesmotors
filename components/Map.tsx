import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, MarkerDragStartEndEvent, Region } from "react-native-maps";

type MapProps = {
  initCoords?: { latitude: number; longitude: number };
  draggable?: boolean;
  width?: number;
  height?: number;
};

const Map: React.FC<MapProps> = ({ initCoords, draggable = false, width, height }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const [markerCoords, setMarkerCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupRegion = async () => {
      if (initCoords) {
        const regionData: Region = {
          ...initCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(regionData);
        setMarkerCoords(initCoords);
        setLoading(false);
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setRegion({
          ...userCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarkerCoords(userCoords);
        setLoading(false);
      }
    };

    setupRegion();
  }, [initCoords]);

  const handleMarkerDragEnd = (e: MarkerDragStartEndEvent) => {
    console.log(e);

    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
  };

  if (loading || !region) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { width: width ?? Dimensions.get("window").width, height: height ?? Dimensions.get("window").height },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ width: width ?? Dimensions.get("window").width, height: height ?? Dimensions.get("window").height }}>
      <MapView
        style={styles.map}
        initialRegion={region}
        scrollEnabled={draggable}
        zoomEnabled={draggable}
        rotateEnabled={draggable}
        pitchEnabled={draggable}
      >
        {markerCoords && (
          <Marker
            coordinate={markerCoords}
            draggable={draggable}
            onDragEnd={draggable ? handleMarkerDragEnd : undefined}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
