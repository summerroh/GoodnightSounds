import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";

function PresetScreen(props) {
  const [presets, setPresets] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // AsyncStorage의 모든 아이템을 가져오기(작업중)
  const getData = async () => {
    try {
      // AsyncStorage의 모든 키 가져오기
      let keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      setKeys(keys);
      // keys.forEach((key) => console.log(key));
      // const presetsData = JSON.parse(await AsyncStorage.getItem("preset16  "));
      // setPresets(presetsData);
      // console.log("get data: ", presetsData);
    } catch (error) {
      console.log(error);
    }
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          // onPress={() => handlePress(itemMusic)}
          style={[
            styles.soundCard,
            // { backgroundColor: isPlaying ? "#bebebe" : "#fff" },
            { backgroundColor: "#fff" },
          ]}
        >
          {/* <MaterialCommunityIcons
            name={iconName}
            size={20}
            // color={isPlaying ? "#fff" : "#000"}
            color={  "#000"}
          /> */}
          <Text style={[styles.text, { color: "#000" }]}>
            preset
            {/* {itemName} */}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.screenHeader}>Saved Presets</Text>
        <FlatList
          numColumns={4}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={keys}
          keyExtractor={(index) => index}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#00003f",
  },
  container: {
    flex: 1,
    backgroundColor: "#00003f",
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // justifyContent: 'center',
  },
  screenHeader: {
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  row: {
    // flex: 1,
    justifyContent: "space-between",
    marginVertical: 15,
  },
  soundCard: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});

export default PresetScreen;
