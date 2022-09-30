import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";

function PresetScreen(props) {
  const [preset, setPreset] = useState([]);

  useEffect(() => {
    // getData()
  }, []);

  // AsyncStorage의 모든 아이템을 가져오기(작업중)
  const getData = async () => {
    try {
      const presetData = JSON.parse(await AsyncStorage.getItem("preset16  "));
      setPreset(presetData);
      console.log("get data: ", presetData);
    } catch (error) {
      console.log(error);
    }
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
          data={item}
          keyExtractor={(Item) => Item.name}
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
});

export default PresetScreen;
