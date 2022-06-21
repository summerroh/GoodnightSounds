import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

function Sound({ itemName, itemMusic, iconName }) {
  let soundObj = undefined;
  let backgroundColor = "#fff";
  // const [backgroundColor, setBackgroundColor] = useState("#fff");
  // const [color, setColor] = useState(null);
  // if (soundObj === !undefined) {
  //   backgroundColor = soundObj._loaded ? "lightgray" : "#fff";
  //   console.log(backgroundColor);
  // }

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
  }, []);

  const handleAudioPlayPause = async (audio) => {
    if (soundObj === undefined) {
      soundObj = new Audio.Sound();
      let status = await soundObj.loadAsync(audio, { shouldPlay: true });
      // backgroundColor = "lightgray";
    } else if (!soundObj._loaded) {
      // setBackgroundColor("lightgray");
      let status = await soundObj.loadAsync(audio, { shouldPlay: true });
      // backgroundColor = "lightgray";
    } else if (soundObj._loaded) {
      soundObj.unloadAsync();
      // setBackgroundColor("#fff");
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleAudioPlayPause(itemMusic).catch(console.error)}
        style={[styles.soundCard, { backgroundColor }]}
        // style={[styles.soundCard]}
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
