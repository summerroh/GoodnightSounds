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
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Sound from "../components/Sound";
import { sounds } from "../data/Data";
import SetNameModal from "../components/SetNameModal";
import { useFocusEffect } from "@react-navigation/native";

function SoundsScreen({ navigation, route }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const [saveClicked, setSaveClicked] = useState(0);
  const [preset, setPreset] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("Preset Name");
  const [data, setData] = useState([]);

  // Firestore에서 데이터 받아오기
  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "data"));

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      data: [doc.data().data],
    }));
    console.log("documents, ", documents);
    setData(documents);
  };

  // selectedItem이 dependency로 들어간 useEffect가 첫 렌더시에 실행되지 않게 해줌
  const firstRender = useRef(true);

  const presetsData = route.params;

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  useEffect(() => {
    if (presetsData === undefined) {
      return;
    }
    setPreset(presetsData.presetsData);
  }, [presetsData]);

  useEffect(() => {
    // console.log(firstRender);
    if (firstRender.current === false && selectedItem.length > 0) {
      // storeData(selectedItem);
      setModalVisible(true);
    }
    firstRender.current = false;
  }, [selectedItem]);

  const storeData = async (value) => {
    setModalVisible(false);
    // console.log("value", value);
    // Preset Name 넣어주기
    let valueWithName = [...value, { presetName: text }];

    let date = JSON.stringify(new Date());

    try {
      // AsyncStorage에 값 저장하기
      await AsyncStorage.setItem(date, JSON.stringify(valueWithName));
    } catch (e) {}
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
    console.log(item);
    return (
      <FlatList
        numColumns={4}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(Item) => Item.name}
        renderItem={renderItem}
      />
    );
  };

  const onSave = () => {
    setSaveClicked(saveClicked + 1);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <SetNameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressFunc={storeData}
          onChangeText={onChangeText}
          text={text}
          currentItem={selectedItem}
        />

        <SectionList
          ListHeaderComponent={
            <View style={styles.listHeadContainer}>
              <Text style={styles.screenHeader}>Goodnight, {"\n"}Summer</Text>

              {/* <MaterialCommunityIcons
                name="folder-music"
                size={34}
                color="#fff"
                onPress={() => navigation.navigate("presetScreen")}
              /> */}
              <Entypo
                name="folder-music"
                size={34}
                color="#fff"
                style={styles.presetIcon}
                onPress={() => navigation.navigate("presetScreen")}
              />
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
          // sections={sounds}
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={flatList}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.soundCardHeader}>{title}</Text>
          )}
        />
        <TouchableOpacity
          style={{
            width: 54,
            height: 54,
            backgroundColor: "#000",
            position: "absolute",
            right: 20,
            bottom: 20,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onSave()}
        >
          <Feather name="heart" size={24} color="#fff" />
          <Text style={styles.subText}>Save</Text>
        </TouchableOpacity>
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
    // alignItems: "center",
    justifyContent: "space-between",
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
  subText: {
    fontSize: 14,
    color: "#fff",
    marginTop: -2,
    // marginBottom: 40,
  },
  soundCardHeader: {
    fontSize: 20,
    color: "#fff",
  },
  presetIcon: {},
});

export default SoundsScreen;
