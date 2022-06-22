import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

function Sound({ itemName, itemMusic, iconName }) {
  let soundObj = new Audio.Sound();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      // playsInSilentModeIOS: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    }).catch(console.error);
    // initializeAudio(itemMusic);
  }, []);

  const handlePress = (audio) => {
    // setIsPlaying(!isPlaying);
    handleAudioPlayPause(audio).catch(console.error);
  };

  const handleAudioPlayPause = async (audio) => {
    if (!soundObj._loaded) {
      soundObj.loadAsync(audio, { shouldPlay: true });
    } else if (soundObj._loaded) {
      soundObj.unloadAsync();
    }
  };

  const volumeControl = async () => {
    // value: 0.0 ~ 1.0
    soundObj.setVolumeAsync(1).catch(console.error);
  };

  return (
    <View>
      <Button title="volume" onPress={() => volumeControl()}></Button>
      <TouchableOpacity
        onPress={() => handlePress(itemMusic)}
        // style={[styles.soundCard, { backgroundColor }]}
        style={[styles.soundCard]}
      >
        <MaterialCommunityIcons name={iconName} size={20} color={"black"} />
        {/* <Text style={[{ color }]}>{item.name}</Text> */}
        <Text style={styles.text}>{itemName}</Text>
      </TouchableOpacity>
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
