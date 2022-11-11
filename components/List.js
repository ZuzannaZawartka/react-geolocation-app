import React, { Component, useState, useEffect } from "react";

import {
  View,
  FlatList,
  Switch,
  ActivityIndicator,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ButtonNew from "./MyButton";
import ListItem from "./ListItem";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [arrayEnabled, setEnabledArray] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let array = [];

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);

    let keys = await AsyncStorage.getAllKeys();
    let table = [];
    for (let i = 0; i < keys.length; i++) {
      let value = await AsyncStorage.getItem(keys[i]);

      if (value != null) {
        value = JSON.parse(value);
        value.isEnabled = !isEnabled;
        console.log(keys[i]);
        await AsyncStorage.mergeItem(keys[i], JSON.stringify(value));
        readItemFromStorage();
      }

      // table.push({ id: keys[i], value: JSON.parse(value) })
    }
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const readItemFromStorage = async () => {
    setEnabledArray([]);
    let table = [];
    let keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < keys.length; i++) {
      let value = await AsyncStorage.getItem(keys[i]);
      table.push({ id: keys[i], value: JSON.parse(value) });
    }
    setData(table);
    setLoading(false);

    array = [];

    console.log("TABLE");
    console.log(table);
    for (let i = 0; i < table.length; i++) {
      if (table[i].value.isEnabled == true) {
        console.log("WLACZONY ENABLED");
        array.push(table[i]);
        //setEnabledArray([...arrayEnabled, { id: table[i].id, value: table[i] }])
      }
    }
    console.log(array);

    setEnabledArray(array);
    //checkEnabledArray()
  };

  const componentDidMount = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    } else {
      setLoading(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    addPosition(location);
    setLoading(false);
  };

  const addPosition = async (location) => {
    location.isEnabled = false;
    setData([...data, { id: "key" + location.timestamp, value: location }]);
    await AsyncStorage.setItem(
      "key" + location.timestamp,
      JSON.stringify(location)
    );
    //createTableFromAsyncStorage()
  };

  const toggled = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);

      if (value != null) {
        value = JSON.parse(value);
        value.isEnabled = !value.isEnabled;
        //await AsyncStorage.mergeItem(key, JSON.stringify(value))
        await AsyncStorage.setItem(key, JSON.stringify(value));
        readItemFromStorage();

        // let value2 = await AsyncStorage.getItem(key)
      }
    } catch (e) {
      // error reading value
    }
  };

  const checkEnabledArray = async () => {
    setEnabledArray([]);

    // console.log("czytaneie dataS")
    // for (let i = 0; i < data.length; i++) {
    //     console.log(data[i])
    //     let value = await AsyncStorage.getItem(data[i].id)
    //     if (JSON.parse(value).isEnabled == false) {

    //         setEnabledArray([...arrayEnabled, { id: data[i].id, value: data[i] }])

    //     }
    // }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const removeItems = async () => {
    let keys = await AsyncStorage.getAllKeys();

    let stores = await AsyncStorage.multiGet(keys);

    let maps = stores.map(async (result, i, store) => {
      let key = store[i][0];
      try {
        await AsyncStorage.removeItem(key);
        return true;
      } catch (exception) {
        return false;
      }
    });

    let keys2 = await AsyncStorage.getAllKeys();
    setData([]);
    setEnabledArray([]);
  };

  // let data = [
  //     { key: 123, latitude: "cos", longitude: "cscs" }
  // ]

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ButtonNew
          function={() => componentDidMount()}
          text={"POBIERZ I ZAPISZ POZYCJĘ"}
        ></ButtonNew>
        <ButtonNew
          function={() => removeItems()}
          text={"USUŃ WSZYSTKIE DANE"}
        ></ButtonNew>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ButtonNew
          function={() => {
            if (arrayEnabled.length > 0) {
              props.navigation.navigate("Map", { array: arrayEnabled });
            }
          }}
          text={"PRZEJDŹ DO MAPY"}
        ></ButtonNew>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                function={toggled}
                id={item.id}
                latitude={item.value.coords.latitude}
                longitude={item.value.coords.longitude}
                switch={item.value.isEnabled}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 15,
    fontSize: 48,
  },
});

export default List;
