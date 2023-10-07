import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { Audio } from "expo-av";
import MusicControl from "react-native-music-control";

export default function AudioPlayer() {
  const audioUri =
    "https://firebasestorage.googleapis.com/v0/b/goodnightsounds-d5cd5.appspot.com/o/Typewriter.mp3?alt=media&token=6e229455-7ad2-4743-a59f-8b805e7f2c09"; // Replace with your audio file URL
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  useEffect(() => {
    const initAudio = async () => {
      MusicControl.enableBackgroundMode(true);
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );

      setSoundObject(sound);

      MusicControl.enableControl("play", true);
      MusicControl.enableControl("pause", true);

      MusicControl.on("play", () => {
        sound.playAsync();
        setIsPlaying(true);
      });

      MusicControl.on("pause", () => {
        sound.pauseAsync();
        setIsPlaying(false);
      });

      MusicControl.setNowPlaying({
        title: "Sample Audio",
        artist: "Your Artist",
        duration: status.durationMillis / 1000,
      });
    };

    initAudio();

    return () => {
      MusicControl.stopControl();
    };
  }, []);

  useEffect(() => {
    // Update the music control state when isPlaying changes
    if (isPlaying) {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      });
    } else {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    }
  }, [isPlaying]);

  return (
    <View>
      <Button
        title="Pause"
        onPress={() => {
          setIsPlaying(false);
        }}
      />
      <Button
        title="Play"
        onPress={() => {
          setIsPlaying(true);
        }}
      />
    </View>
  );
}
