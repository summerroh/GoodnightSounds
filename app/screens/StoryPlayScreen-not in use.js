import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";

import defaultStyles from "../../style";
import Sound from "../components/Sound";
import StorySound from "../components/StorySound";
import MyModal from "../components/MyModal";

export default function StoryPlayScreen({ navigation, route }) {
  const { item } = route.params ?? {};
  // console.log("item", item);

  const [selectedItem, setSelectedItem] = useState([]);
  const [voice, setVoice] = useState(new Audio.Sound());
  const [preset, setPreset] = useState([]);
  const [saveClicked, setSaveClicked] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 유저가 뒤로가기 버튼을 누를 경우 확인
  useEffect(() => {
    const handleHardwareBackPress = () => {
      setModalVisible(true);
      return true; // Return true to indicate that we've handled the back press
    };

    BackHandler.addEventListener("hardwareBackPress", handleHardwareBackPress);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleHardwareBackPress
      );
    };
  }, []);

  // 유저가 뒤로가기 버튼을 누르고 확인창에서 나간다고 확인 하면 뒤로 보내주는 펑션
  const handleConfirmLeave = () => {
    navigation.goBack();
  };

  // 파이어베이스에서 목소리 파일 가져오기
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      if (item) {
        setPreset(item.presetsData);
      }

      return () => {
        voice.unloadAsync();
      };
    }, [])
  );

  const audioUrl = item.voiceUrl;
  const fileUri =
    FileSystem.documentDirectory + `${item.name}-v${item.version}.mp3`;

  const downloadAudio = async () => {
    try {
      const downloadResult = await FileSystem.downloadAsync(audioUrl, fileUri);
      if (downloadResult.status === 200) {
        console.log("Audio downloaded successfully:", downloadResult.uri);

        // Now you can use the downloaded fileUri for playback or other purposes
        playVoice(fileUri);
      } else {
        console.error(
          "Failed to download audio. Status:",
          downloadResult.status
        );
      }
    } catch (error) {
      console.error("Error while downloading audio:", error);
    }
  };

  // 스토리 클릭시,
  // 1. 그 스토리가 기기 내에 저장되어 있는지 확인
  // 2. 저장되어 있지 않을 시, 다운로드 후 재생
  // 3. 저장되어 있을 시, 재생
  const fetchData = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      // 3. 저장되어 있을 시
      if (fileExists.exists) {
        console.log(
          "저장된 스토리 오디오 파일이 있습니다.",
          "파일 이름:",
          fileUri
        );
        // Voice재생
        playVoice(fileUri);

        // 2. 저장되어 있지 않을 시
      } else {
        console.log("저장된 스토리 오디오 파일이 없습니다.");
        // 다운로드
        downloadAudio();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const playVoice = async (soundUrl) => {
    try {
      await voice.loadAsync({ uri: soundUrl });
      await voice.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <StorySound
        itemName={item.name}
        itemMusic={item.sound}
        iconName={item.iconName}
        preset={preset}
      />
    );
  };

  return (
    <View>
      <FlatList
        numColumns={4}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={item.soundsData}
        keyExtractor={(Item) => Item.name}
        renderItem={renderItem}
      />
      <Text>{item.name}</Text>
      <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onConfirm={handleConfirmLeave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.primary,
  },

  row: {
    // flex: 1,
    justifyContent: "space-between",
    // justifyContent: "flex-start",
    marginVertical: 15,
  },
});
