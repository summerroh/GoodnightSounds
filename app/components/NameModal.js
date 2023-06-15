import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";

export default function NameModal({
  modalVisible,
  setModalVisible,
  onPressFunc,
  text,
  onChangeText,
  currentItem,
}) {
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
          <TextInput onChangeText={onChangeText} value={text} />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => onPressFunc(currentItem)}
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
});
