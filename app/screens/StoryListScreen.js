import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import Screen from "../components/Screen";
import NameModal from "../components/NameModal";
import defaultStyles from "../../style";

function StoryListScreen({ navigation }) {
  const [presetData, setPresetData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("Default Preset Name");
  const [currentItem, setCurrentItem] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  // Firestore에서 stories 데이터 받아오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));

    const documents = querySnapshot.docs.map((doc) => ({
      data: [doc.data()],
    }));
    setData(documents[0].data[0].data);
    // console.log(documents[0].data[0].data);
  };

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  // (SoundScreen의 preset을 dependency로 하는 useEffect와 연결됨)
  const handlePress = async (item) => {
    try {
      // navigation.navigate("soundsScreen", {
      //   // item: item,
      //   presetsData: item.presetsData,
      //   // playStory: true,
      // });
      navigation.navigate("storyPlayScreen", {
        item: item,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editName = async (item) => {
    setModalVisible(!modalVisible);

    let key = item[0];

    // Parse the JSON data stored in AsyncStorage
    let storedData = await AsyncStorage.getItem(key);
    let parsedData = JSON.parse(storedData);

    // Find the item with the "presetName" key and update its value
    const updatedItem = parsedData.map((dataItem) => {
      if (dataItem.presetName) {
        return { ...dataItem, presetName: text };
      }
      return dataItem;
    });

    // Save the updated data back to AsyncStorage
    try {
      await AsyncStorage.setItem(key, JSON.stringify(updatedItem));
    } catch (e) {
      console.log("error while updating the preset name", e);
    }
    getData();
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={[styles.soundCard]}
        >
          <Text style={[styles.text, { color: "#000" }]}>{item.name}</Text>
          <Feather name="clock" size={24} color="black" />
          <Text style={[styles.text, { color: "#000" }]}>{item.duration}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.screenHeader}>Nighttime {`\n`}Stories</Text>
        </View>

        <NameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          editName={editName}
          onChangeText={onChangeText}
          currentItem={currentItem}
        />

        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(index) => index}
          renderItem={renderItem}
        ></FlatList>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.primary,
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  // topBar: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  screenHeader: {
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
    marginLeft: 6,
  },
  row: {
    // flex: 1,
    justifyContent: "space-between",
    marginVertical: 15,
  },
  soundCard: {
    width: 150,
    height: 169,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "black",
  },
  imageBackground: {
    // flex: 1,
    width: 150,
    height: 169,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default StoryListScreen;
