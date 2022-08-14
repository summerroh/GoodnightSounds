import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SectionList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";
import Sound from "../components/Sound";
import { sounds } from "../data/Data";

function SoundsScreen() {
  const [selectedItem, setSelectedItem] = useState([]);

  const storeData = async (value) => {
    // try {
    //   await AsyncStorage.setItem("user", JSON.stringify(value));
    // } catch (e) {
    //   // saving error
    // }
    console.log(selectedItem);
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
              <Text style={styles.screenHeader}>saved</Text>
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
          onPress={() => storeData()}
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
