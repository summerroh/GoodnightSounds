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
  const [text, onChangeText] = useState("Useless Text");

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

  const editName = (item) => {
    console.log("edit name ");
    setModalVisible(true);
    // 유저가 입력한 이름 저장하기
    // try {
    //   // AsyncStorage에 값 저장하기
    //   await AsyncStorage.setItem(item, JSON.stringify(value));
    // } catch (e) {}
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
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: 30,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => editName(item)}
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

          <Text style={[styles.text, { color: "#000" }]}>{item}</Text>
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
              <Text>Hello World!</Text>
              <TextInput onChangeText={onChangeText} value={text} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
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
