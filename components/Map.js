import React, { Component, useState } from "react";

import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
const Map = (props) => {
  const [data, setData] = useState([]);
  let tablica = [];
  props.route.params.array.forEach((element) => {
    console.log(element.value.timestamp);
    tablica.push({
      timestamp: element.value.timestamp,
      latitude: element.value.coords.latitude,
      longitude: element.value.coords.longitude,
    });
  });

  let points = tablica.map((element) => (
    <MapView.Marker
      key={element.timestamp}
      coordinate={{
        latitude: element.latitude,
        longitude: element.longitude,
      }}
      title={"pos"}
    />
  ));

  let width;

  if (!props.width) {
    width;
  } else {
    width = props.width;
  }

  let x;
  if (points.length > 0) {
    console.log(tablica[0]);
    x = {
      latitude: tablica[0].latitude,
      longitude: tablica[0].longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
  } else {
    x = {
      latitude: 50.047189188960296,
      longitude: 19.920507788911273,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
  }

  return (
    <MapView style={{ flex: 1 }} initialRegion={x}>
      {points}
    </MapView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 15,
    fontSize: 48,
  },
});

export default Map;
