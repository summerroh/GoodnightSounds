import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, SectionList } from "react-native";

import Screen from "../components/Screen";
import Sound from "../components/Sound";
import { sounds } from "../data/Data";

function SoundsScreen() {
  const [selectedName, setSelectedName] = useState([]);

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <Sound
        itemName={item.name}
        itemMusic={item.music}
        iconName={item.iconName}
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
        extraData={selectedName}
        renderItem={renderItem}
      ></FlatList>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <SectionList
          ListHeaderComponent={<Text style={styles.screenHeader}>Sounds</Text>}
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
