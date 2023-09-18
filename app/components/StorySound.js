import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Slider } from "@miblanchard/react-native-slider";
import defaultStyles from "../../style";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
// import { BlurView } from "@react-native-community/blur";
// import { BlurView } from "expo-blur";
import { useNavigationState } from "@react-navigation/native";

function StorySound({ itemName, itemMusic, iconName, preset }) {
  const [soundObj, setSoundObj] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // 새 preset이 들어왔을때 기존 preset을 리셋해주기 위한 state
  const [presetList, setPresetList] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("");

  const firstRender = useRef(true);
  const isFocused = useIsFocused();
  const navigationState = useNavigationState((state) => state);

  // 화면에서 나가면 소리 꺼지기
  useEffect(() => {
    handlePress(itemMusic);
    return () => {
      stopSound();
    };
  }, [isFocused]);

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

  // 프리셋 로드버튼눌렀을때 (음악 플레이 기능)
  //   useEffect(() => {
  //     if (isPlaying) {
  //       stopSound();
  //     }
  //     for (i = 0; i < preset.length; i++) {
  //       if (preset[i].itemName === itemName) {
  //         playSound(itemMusic);
  //         volumeControl(preset[i].volume);
  //       }
  //     }
  //   }, [preset]);

  // 프리셋 로드버튼눌렀을때 (음악 플레이 기능)
  //   const playSound = async (audio) => {
  //     setIsPlaying(true);
  //     if (audio) {
  //       await soundObj.loadAsync(
  //         { uri: audio },
  //         { shouldPlay: true, isLooping: true }
  //       );
  //       await soundObj.setVolumeAsync(0.5);
  //       // await soundObj.setIsLoopingAsync(true);
  //     } else {
  //       console.error("playsound(): Cannot load audio from a null source.");
  //     }
  //   };
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
          {
            backgroundColor: isPlaying ? "#fff" : defaultStyles.colors.primary,
            borderColor: isPlaying ? defaultStyles.colors.primary : "#fff",
          },
        ]}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={isPlaying ? defaultStyles.colors.primary : "#fff"}
        />
        <Text
          style={[
            styles.text,
            { color: isPlaying ? defaultStyles.colors.primary : "#fff" },
          ]}
        >
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
    // backgroundColor: "#ffffff80", // white의 alpha값 50%
    width: 70,
    height: 70,
    borderRadius: 24,
    // marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    color: "black",
  },
});

export default StorySound;
