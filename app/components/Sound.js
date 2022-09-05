import React, { useState, useEffect } from "react";
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
}) {
  const [soundObj, setSoundObj] = useState(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // if (initialPlay) {
    //   setSelectedItem((prev) => [...prev, itemName]);
    //   handlePress(itemMusic);
    // }

    Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      // playsInSilentModeIOS: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    }).catch(console.error);
  }, []);

  const handlePress = async (audio) => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setSelectedItem((prev) =>
        prev.filter((item) => item.itemName !== itemName)
      );
    } else {
      setSelectedItem((prev) => [
        ...prev,
        { itemName: itemName, volume: volume },
      ]);
    }

    if (!isPlaying) {
      await soundObj.loadAsync(audio, { shouldPlay: true });
      await soundObj.setVolumeAsync(0.5);
    } else {
      await soundObj.unloadAsync();
    }
  };

  const volumeControl = async (value) => {
    // value: 0.0 ~ 1.0
    setVolume(value);
    console.log(volume);
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
          value={0.5}
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
});

export default Sound;
