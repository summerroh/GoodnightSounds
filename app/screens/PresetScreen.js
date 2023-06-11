import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import Screen from "../components/Screen";

function PresetScreen({ navigation }) {
  const [presets, setPresets] = useState([]);
  const [keys, setKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("text");
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    getData();
  }, []);

  // AsyncStorage의 모든 아이템을 가져오기
  const getData = async () => {
    try {
      // AsyncStorage의 모든 키 가져오기
      let keys = await AsyncStorage.getAllKeys();
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

  // 프리셋 리셋 기능 (버튼 숨겨놓음)
  const resetData = async () => {
    try {
      await AsyncStorage.clear();
      let keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
    } catch (e) {}
  };

  // 프리셋 클릭시 - 음악 플레이되게 하는 기능
  // (SoundScreen의 preset을 dependency로 하는 useEffect와 연결됨)
  const handlePress = async (item) => {
    try {
      const presetsData = JSON.parse(await AsyncStorage.getItem(item));
      console.log(presetsData);
      navigation.navigate("soundsScreen", { presetsData: presetsData });
    } catch (error) {
      console.log(error);
    }
  };

  const editName = async (item) => {
    setModalVisible(!modalVisible);
    console.log("edit name to: ", text);

    let value = { presetName: text };
    // 원래의 preset data 가져오기
    const currentPresetsData = JSON.parse(await AsyncStorage.getItem(item));
    currentPresetsData.push(value);

    // 유저가 입력한 이름 저장하기
    try {
      // AsyncStorage에 값 저장하기
      await AsyncStorage.setItem(item, JSON.stringify(currentPresetsData));
    } catch (e) {}
  };

  const renderName = (item) => {
    // const data = JSON.parse(await AsyncStorage.getItem(item));
    // getPresetName();
    // console.log(data.presetName);
    return "name";
  };
  // const getPresetName = async (item) => {
  //   const data = [];
  //   try {
  //     data = JSON.parse(await AsyncStorage.getItem(item));
  //   } catch (e) {}
  //   return data;
  // };

  const getPresetName = async (item) => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem(item));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // 이름(presetName) 불러오기
    let name = "1";
    const namePromise = getPresetName(item);
    let nameResolved = Promise.resolve(namePromise);
    nameResolved.then(function (val) {
      // 데이터 어레이의 마지막 오브젝트에 presetName 이라는 키가 있으면
      // name을 그 키의 값(이름)으로 설정해준다
      if (val[val.length - 1].presetName) {
        name = val[val.length - 1].presetName;
        console.log("name1:", name);
      }
    });
    console.log("name:", name);
    return (
      <View>
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={[styles.soundCard]}
        >
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: 30,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => {
              setModalVisible(true);
              setCurrentItem(item);
            }}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: 0,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => deletePreset(item)}
          >
            <Feather name="x" size={24} color="#00003F" />
          </Pressable>

          <Text style={[styles.text, { color: "#000" }]}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Feather
            name="chevron-left"
            size={40}
            color="#fff"
            onPress={() => navigation.navigate("soundsScreen")}
          />
          <Text style={styles.screenHeader}>Saved Presets</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput onChangeText={onChangeText} value={text} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => editName(currentItem)}
              >
                <Text style={styles.textStyle}>Change Name</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={keys}
          keyExtractor={(index) => index}
          renderItem={renderItem}
        ></FlatList>

        {/* 프리셋 리셋버튼 */}
        {/* <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "green",
            position: "absolute",
            left: 20,
            bottom: 20,
          }}
          onPress={() => resetData()}
        ></TouchableOpacity> */}
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
    backgroundColor: "#fff",
    width: 150,
    height: 130,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default PresetScreen;
