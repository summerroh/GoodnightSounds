import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function NameModal({
  modalVisible,
  setModalVisible,
  editName,
  onChangeText,
  currentItem,
}) {
  const [presetName, setPresetName] = useState("");

  // console.log("currentItem---------", currentItem);

  useFocusEffect(
    React.useCallback(() => {
      // 한 프리셋의 수정 버튼이 클릭된 경우 그 프리셋의 이름을 불러온다.
      if (currentItem) {
        let presetName = currentItem[1].find(
          (preset) => preset.presetName
        )?.presetName;
        setPresetName(presetName);
        onChangeText(presetName);
      }
      return () => {};
    }, [currentItem])
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              right: 0,
              top: 10,
              zIndex: 10,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Feather name="x" size={24} color="#00003F" />
          </Pressable>
          <TextInput onChangeText={onChangeText} defaultValue={presetName} />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => editName(currentItem)}
          >
            <Text style={styles.textStyle}>Change Name</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  textStyle: {
    color: "#fff",
  },
});
