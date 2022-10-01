import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SectionList,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";
import Sound from "../components/Sound";
import { sounds } from "../data/Data";

function SoundsScreen({ navigation }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const [saveClicked, setSaveClicked] = useState(0);
  const [preset, setPreset] = useState([]);
  // selectedItem이 dependency로 들어간 useEffect가 첫 렌더시에 실행되지 않게 해줌
  const firstRender = useRef(true);

  useEffect(() => {
    // console.log(firstRender);
    if (firstRender.current === false) {
      storeData(selectedItem);
    }
    firstRender.current = false;
  }, [selectedItem]);

  const storeData = async (value) => {
    try {
      // AsyncStorage의 모든 키 가져오기
      let keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      // AsyncStorage에 값 저장하기
      console.log(keys.length);
      await AsyncStorage.setItem(
        `preset${keys.length + 1}`,
        JSON.stringify(value)
      );
    } catch (e) {}
  };
  const resetData = async () => {
    try {
      await AsyncStorage.setItem("preset1", JSON.stringify([]));
    } catch (e) {
      // saving error
    }

    setSaveClicked(saveClicked + 1);
    // console.log(selectedItem);
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <Sound
        itemName={item.name}
        itemMusic={item.music}
        iconName={item.iconName}
        initialPlay={false}
        setSelectedItem={setSelectedItem}
        saveClicked={saveClicked}
        preset={preset}
      />
    );
  };

  const flatList = ({ item }) => {
    return (
      <FlatList
        numColumns={4}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(Item) => Item.name}
        renderItem={renderItem}
      ></FlatList>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <SectionList
          ListHeaderComponent={
            <View style={styles.listHeadContainer}>
              <Text style={styles.screenHeader}>Goodnight, {"\n"}Summer</Text>
              <Text
                style={styles.screenHeader}
                onPress={() => navigation.navigate("presetScreen")}
              >
                saved
              </Text>
            </View>
          }
          contentContainerStyle={{
            paddingBottom: 30,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          sections={sounds}
          keyExtractor={(item, index) => item + index}
          renderItem={flatList}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.soundCardHeader}>{title}</Text>
          )}
        />
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#000",
            position: "absolute",
            right: 20,
            bottom: 20,
          }}
          onPress={() => setSaveClicked(saveClicked + 1)}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "green",
            position: "absolute",
            left: 20,
            bottom: 20,
          }}
          onPress={() => resetData()}
        ></TouchableOpacity>
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
    // justifyContent: 'center',
  },
  listHeadContainer: {
    flexDirection: "row",
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
  screenHeader: {
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  soundCardHeader: {
    fontSize: 20,
    color: "#fff",
  },
});

export default SoundsScreen;
