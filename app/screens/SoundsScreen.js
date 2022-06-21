import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SectionList,
  Button,
} from "react-native";

import Screen from "../components/Screen";
import Sound from "../components/Sound";

const music1 = require("../../assets/nujabes1.mp3");
const music2 = require("../../assets/nujabes2.mp3");

const sounds = [
  {
    title: "Rainy Sounds",
    data: [
      [
        { name: "Rain", iconName: "weather-rainy", music: music1, sound: {} },

        { name: "Bird", iconName: "airplane", music: music2, sound: {} },

        { name: "Thunder", iconName: "cloud", music: music1, sound: {} },

        { name: "Snow", iconName: "weather-rainy", music: music2, sound: {} },

        { name: "Puddle", iconName: "airplane", music: music1, sound: {} },

        { name: "Lake", iconName: "cloud", music: music2, sound: {} },
      ],
    ],
  },
  {
    title: "Train Sounds",
    data: [
      [
        { name: "Train", iconName: "weather-rainy", music: music1 },

        { name: "Subway", iconName: "airplane", music: music2 },

        { name: "Car", iconName: "cloud", music: music1 },

        { name: "Airplane", iconName: "weather-rainy", music: music2 },

        { name: "City", iconName: "airplane" },

        { name: "Wiper", iconName: "cloud" },

        { name: "Fan", iconName: "weather-rainy" },

        { name: "Dryer", iconName: "airplane" },
      ],
    ],
  },
  {
    title: "Train Sounds",
    data: [
      [
        { name: "Frog", iconName: "weather-rainy" },

        { name: "Frog2", iconName: "airplane" },

        { name: "Cricket", iconName: "cloud" },

        { name: "Wolf", iconName: "weather-rainy" },

        { name: "Cat Purring", iconName: "airplane" },

        { name: "Dog", iconName: "cloud" },

        { name: "Loon", iconName: "weather-rainy" },

        { name: "Bell", iconName: "airplane" },
      ],
    ],
  },
  {
    title: "Mellodies",
    data: [
      [
        { name: "Chime", iconName: "weather-rainy" },

        { name: "Cafe", iconName: "airplane" },

        { name: "Crowd", iconName: "cloud" },

        { name: "Lullaby", iconName: "weather-rainy" },

        { name: "Song1", iconName: "airplane" },

        { name: "Song2", iconName: "cloud" },

        { name: "Rest", iconName: "weather-rainy" },

        { name: "Harp", iconName: "airplane" },
      ],
    ],
  },
];

function SoundsScreen() {
  const [selectedName, setSelectedName] = useState([]);
  const [firstClick, setFirstClick] = useState(true);

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // selectedName 안에 item.name이 있나 없나 확인하고 background랑 color 색상 토글하기
    // const backgroundColor = selectedName.includes(item.name)  ? "lightgray" : "#fff";
    // const color = selectedName.includes(item.name) ? 'white' : 'black';
    // // const sound = item.sound

    // const handleSoundCardPress = (itemName, itemMusic) => {

    //   selectedName.includes(item.name)
    //   ? setSelectedName(selectedName.filter((item) => itemName !== item))
    //   : setSelectedName(prevArray => [...prevArray, itemName]);

    //   handleAudioPlayPause(itemName, itemMusic);
    // };
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
        <Button
          onPress={() => console.log("can i console log")}
          title="test sound!"
        ></Button>

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
