import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Slider } from "@miblanchard/react-native-slider";

function Sound({
  itemName,
  itemMusic,
  iconName,
  initialPlay,
  setSelectedItem,
  saveClicked,
  preset,
}) {
  const [soundObj, setSoundObj] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // 새 preset이 들어왔을때 기존 preset을 리셋해주기 위한 state
  const [presetList, setPresetList] = useState([]);

  // saveClicked dependency로 들어간 useEffect가 첫 렌더시에 실행되지 않게 해줌
  const firstRender = useRef(true);

  useEffect(() => {
    Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      // playsInSilentModeIOS: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: false,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    }).catch(console.error);
  }, []);

  // 프리셋 저장버튼 눌렀을때
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    }
    if (isPlaying) {
      setSelectedItem((prev) => [
        // 중복된 값 안들어가도록 filter 처리해줌
        ...prev.filter((item) => item.itemName !== itemName),
        { itemName: itemName, volume: volume },
      ]);
    } else {
      // 플레이중이 아니면 selectedItem에서 빼기
      setSelectedItem((prev) => [
        // 중복된 값 안들어가도록 filter 처리해줌
        ...prev.filter((item) => item.itemName !== itemName),
      ]);
    }
  }, [saveClicked]);
  // 프리셋 로드버튼눌렀을때 (음악 플레이 기능)
  useEffect(() => {
    if (isPlaying) {
      stopSound();
    }
    for (i = 0; i < preset.length; i++) {
      if (preset[i].itemName === itemName) {
        playSound(itemMusic);
        volumeControl(preset[i].volume);
      }
    }
  }, [preset]);

  // 프리셋 로드버튼눌렀을때 (음악 플레이 기능)
  const playSound = async (audio) => {
    setIsPlaying(true);
    if (audio) {
      await soundObj.loadAsync(
        { uri: audio },
        { shouldPlay: true, isLooping: true }
      );
      await soundObj.setVolumeAsync(0.5);
      // await soundObj.setIsLoopingAsync(true);
    } else {
      console.error("playsound(): Cannot load audio from a null source.");
    }
  };
  // 프리셋 로드버튼눌렀을때 (음악 중지 기능)
  const stopSound = async () => {
    setIsPlaying(false);
    await soundObj.unloadAsync();
  };

  const handlePress = async (audio) => {
    setIsPlaying(!isPlaying);
    setVolume(0.5);

    if (!isPlaying) {
      await soundObj.loadAsync(
        { uri: audio },
        { shouldPlay: true, isLooping: true }
      );
      await soundObj.setVolumeAsync(0.5);
    } else {
      await soundObj.unloadAsync();
    }
  };

  const volumeControl = async (value) => {
    // value: 0.0 ~ 1.0
    setVolume(value);
    if (soundObj._loaded) {
      await soundObj.setVolumeAsync(value).catch(console.error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress(itemMusic)}
        style={[
          styles.soundCard,
          { backgroundColor: isPlaying ? "#bebebe" : "#fff" },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={isPlaying ? "#fff" : "#000"}
        />
        <Text style={[styles.text, { color: isPlaying ? "#fff" : "#000" }]}>
          {itemName}
        </Text>
      </TouchableOpacity>
      {isPlaying && (
        <Slider
          containerStyle={{
            width: 70,
            height: 30,
          }}
          minimumValue={0.0}
          maximumValue={1.0}
          step={0.1}
          value={volume}
          onValueChange={(value) => volumeControl(value[0])}
          thumbStyle={{ height: 14, width: 14 }}
          thumbTintColor="#577399"
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#dedede"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  soundCard: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 10,
    // marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});

export default Sound;
