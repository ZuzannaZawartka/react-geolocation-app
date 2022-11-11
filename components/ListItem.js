import React, { Component, useState } from 'react';

import { View, Button, Switch, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonNew from './MyButton';


const ListItem = (props) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    }
    const _onPressButton = () => {
        alert("kolor : " + props.color +
            "tekst :" + props.text)
    }

    return (


        <View style={styles.style1}>


            <View style={styles.style3}>

                <View style={styles.style5}>
                    <Image

                        source={{
                            uri: 'https://www.globe.gov/o/gov.globe.home.explorelearnearth.web/images/learn-earth-system-clean_earth_only.png',
                        }}
                        style={{ height: 80, width: 80, resizeMode: "center", margin: 20 }}
                    />
                </View>

                <View style={styles.style6}>
                    <Text style={styles.text1}>timestamp: {'\n' + props.id.substring(props.id.indexOf('key') + 3)}</Text>
                    <Text style={styles.text2}>latitude:{props.latitude}</Text>
                    <Text style={styles.text2}>longitude:{props.longitude}</Text>
                </View>

                <View style={styles.style5}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            props.function(props.id)
                            toggleSwitch()
                        }}
                        value={props.switch}
                    />
                </View>
            </View>




        </View >
    );
}


const styles = StyleSheet.create({
    text: { fontSize: 48, },
    text1: { fontSize: 15, color: "blue", flexWrap: "wrap" },
    text2: { fontSize: 8 },
    container: { alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "green" }
    , style1: {

        flex: 2,
        display: "flex",
        flexDirection: 'column',

        justifyContent: "center"
    }
    , style2: {

        flex: 9,
        display: "flex",
        flexDirection: 'row',


    }
    , style3: {


        display: "flex",
        flexDirection: "row",
        alignItems: "center"

    }
    , style4: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"

    }
    , style5: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"

    }
    , style6: {
        flex: 2,
        flexWrap: "nowrap",
        textAlign: "center"

    },

});

export default ListItem;