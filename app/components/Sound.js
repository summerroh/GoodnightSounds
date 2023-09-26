import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Slider } from "@miblanchard/react-native-slider";
import defaultStyles from "../../style";
import { useIsFocused } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";

import { useStoryPlaying } from "../context/StoryContext";

function Sound({
  itemName,
  itemMusic,
  iconName,
  setSelectedItem,
  saveClicked,
  preset,
}) {
  const { isStoryPlaying } = useStoryPlaying();
  const [soundObj, setSoundObj] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  // 새 preset이 들어왔을때 기존 preset을 리셋해주기 위한 state
  // const [presetList, setPresetList] = useState([]);
  // const [currentScreen, setCurrentScreen] = useState("");

  // saveClicked dependency로 들어간 useEffect가 첫 렌더시에 실행되지 않게 해줌
  const firstRender = useRef(true);
  const isFocused = useIsFocused();
  const navigationState = useNavigationState((state) => state);
  const currentRouteName = navigationState.routes[navigationState.index].name;

  // Use the current route name to check if the screen is "StoryStack" and stop the sound accordingly
  useEffect(() => {
    if (isStoryPlaying) {
      stopSound();
    }
  }, [isStoryPlaying, isFocused]);

  // Use the current screen name to check if it's "storyPlayScreen"
  // useEffect(() => {
  //   console.log("currentScreen", currentScreen);
  //   if (currentScreen === "storyPlayScreen") {
  //     stopSound();
  //     console.log("STOPPPPPPPPP");
  //   }
  // }, [currentScreen]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
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
        playSound(itemMusic, preset[i].volume);
      }
    }
  }, [preset]);

  // 프리셋 로드버튼눌렀을때 (음악 플레이 기능)
  const playSound = async (audio, volume) => {
    setIsPlaying(true);
    if (audio) {
      await soundObj.loadAsync(
        { uri: audio },
        { shouldPlay: true, isLooping: true }
      );
      if (soundObj._loaded) {
        fadeInEffect(volume);
      }
    } else {
      console.error("playsound(): Cannot load audio from a null source.");
    }
  };
  // 프리셋 로드버튼눌렀을때 (음악 중지 기능)
  const stopSound = async () => {
    setIsPlaying(false);
    await soundObj.unloadAsync();
  };

  // 사운드카드 눌렀을때
  const handlePress = async (audio) => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      await soundObj.loadAsync(
        { uri: audio },
        { shouldPlay: true, isLooping: true }
      );
      if (soundObj._loaded) {
        fadeInEffect(0.5);
      }
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

  const fadeInEffect = async (finalVolume) => {
    const fadeDuration = 2000; // 2 seconds (adjust as needed)
    const initialVolume = soundObj._volume || 0.0; // Use the current volume if available
    let currentVolume = initialVolume;
    const fadeInterval = 100; // Adjust the interval for smoother fading

    while (currentVolume < finalVolume && soundObj._loaded) {
      currentVolume +=
        (finalVolume - initialVolume) / (fadeDuration / fadeInterval);

      // Ensure that currentVolume does not exceed 1.0
      currentVolume = Math.min(currentVolume, 1.0);

      volumeControl(currentVolume);
      await new Promise((resolve) => setTimeout(resolve, fadeInterval));
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress(itemMusic)}
        style={[
          styles.soundCard,
          {
            backgroundColor: isPlaying
              ? defaultStyles.colors.secondary
              : defaultStyles.colors.primary,
            borderColor: isPlaying
              ? defaultStyles.colors.white
              : defaultStyles.colors.grey[200],
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={isPlaying ? defaultStyles.colors.white : "#fff"}
        />
        <Text
          style={[
            defaultStyles.soundCard,
            { color: isPlaying ? defaultStyles.colors.white : "#fff" },
          ]}
        >
          {itemName.replace(/\\n/g, "\n")}
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
          thumbStyle={{ height: 12, width: 12 }}
          thumbTintColor={defaultStyles.colors.grey[200]}
          minimumTrackTintColor={defaultStyles.colors.grey[500]}
          maximumTrackTintColor={defaultStyles.colors.secondary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  soundCard: {
    backgroundColor: "#fff",
    width: 76,
    height: 76,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
  },
});

export default Sound;
