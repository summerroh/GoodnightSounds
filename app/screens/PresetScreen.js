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

  // AsyncStorage의 모든 아이템을 가져오기
  const getData = async () => {
    try {
      // AsyncStorage의 모든 키 가져오기
      let keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      setKeys(keys);
    } catch (error) {
      console.log(error);
    }
  };

  // 프리셋 삭제 기능
  const deletePreset = async (item) => {
    try {
      await AsyncStorage.removeItem(item);
      let keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
    } catch (e) {}
  };

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  const handlePress = async (item) => {
    try {
      const presetsData = JSON.parse(await AsyncStorage.getItem(item));
      console.log("presetdata: ", presetsData);
    } catch (error) {
      console.log(error);
    }
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handlePress(item)}
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
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: "green",
              position: "absolute",
              left: 20,
              bottom: 20,
            }}
            onPress={() => deletePreset(item)}
          ></TouchableOpacity>
          <Text style={[styles.text, { color: "#000" }]}>
            {/* preset */}
            {item}
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
          numColumns={2}
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
    width: 150,
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
