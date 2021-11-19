import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, SectionList, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Screen from '../conponents/Screen'

const music1 = require('../../assets/nujabes1.mp3');
const music2 = require('../../assets/nujabes2.mp3');


const sounds = [
  {
    title: "Rainy Sounds",
    data: [[
      
        {name: 'Rain',
        iconName: 'weather-rainy',
        music: music1
        },
      
        {name: 'Bird',
        iconName: 'airplane',
        music: music2
        },
      
        {name: 'Thunder',
        iconName: 'cloud',
        music: music1
        },
      
        {name: 'Snow',
        iconName: 'weather-rainy',
        music: music2,
        },
      
        {name: 'Puddle',
        iconName: 'airplane',
        music: music1,
        },
      
        {name: 'Lake',
        iconName: 'cloud',
        music: music2,
      },
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Train',
        iconName: 'weather-rainy',
        music: music1,
        },
      
        {name: 'Subway',
        iconName: 'airplane',
        music: music2,
        },
      
        {name: 'Car',
        iconName: 'cloud',
        music: music1,
        },

        {name: 'Airplane',
        iconName: 'weather-rainy',
        music: music2,
        },
      
        {name: 'City',
        iconName: 'airplane'},
      
        {name: 'Wiper',
        iconName: 'cloud'},
        
        {name: 'Fan',
        iconName: 'weather-rainy'},
      
        {name: 'Dryer',
        iconName: 'airplane'},
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Frog',
        iconName: 'weather-rainy'},
      
        {name: 'Frog2',
        iconName: 'airplane'},
      
        {name: 'Cricket',
        iconName: 'cloud'},

        {name: 'Wolf',
        iconName: 'weather-rainy'},
      
        {name: 'Cat Purring',
        iconName: 'airplane'},
      
        {name: 'Dog',
        iconName: 'cloud'},
        
        {name: 'Loon',
        iconName: 'weather-rainy'},
      
        {name: 'Bell',
        iconName: 'airplane'},
      ]]
  },
  {
    title: "Mellodies",
    data: [[
        {name: 'Chime',
        iconName: 'weather-rainy'},
      
        {name: 'Cafe',
        iconName: 'airplane'},
      
        {name: 'Crowd',
        iconName: 'cloud'},

        {name: 'Lullaby',
        iconName: 'weather-rainy'},
      
        {name: 'Song1',
        iconName: 'airplane'},
      
        {name: 'Song2',
        iconName: 'cloud'},
        
        {name: 'Rest',
        iconName: 'weather-rainy'},
      
        {name: 'Harp',
        iconName: 'airplane'},
      ]]
  },
]

function SoundsScreen() {
  const [playbackObjs, setPlaybackObjs] = useState([]);
  const [soundObjs, setSoundObjs] = useState([]);
  const [currentAudios, setCurrentAudios] = useState([{}]);

  const [selectedName, setSelectedName] = useState([]);

  // soundcard들을 렌더링하는 function
  const renderItem = ({ item }) => {
    // selectedName 안에 item.name이 있나 없나 확인하고 background랑 color 색상 토글하기
    const backgroundColor = selectedName.includes(item.name)  ? "lightgray" : "#fff";
    const color = selectedName.includes(item.name) ? 'white' : 'black';

    const handleSoundCardPress = (itemName, itemMusic) => {

      selectedName.includes(item.name)
      ? setSelectedName(selectedName.filter((item) => itemName !== item))
      : setSelectedName(prevArray => [...prevArray, itemName]);

      handleAudioPlayPause(itemMusic);
    };

    return(
      <TouchableOpacity onPress={() => handleSoundCardPress(item.name, item.music)} style={[styles.soundCard, {backgroundColor}]}>
              <MaterialCommunityIcons name={item.iconName} size={20} color={color}/>
              <Text style={[{color}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const flatList = ({ item }) => {
    return (
    <FlatList
        numColumns={4}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      
        data={item}
        keyExtractor={Item => Item.name}
        extraData={selectedName}
        renderItem={renderItem}
    >
    </FlatList>
    )
  }




//playing sound starts
//tutorial: https://www.youtube.com/watch?v=HCvp2fZh--A
useEffect(()=>{
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playThroughEarpieceAndroid: false
  });
  
},[])





//tutorial: https://www.youtube.com/watch?v=NBTj23qe7BA
const handleAudioPlayPause = async (audio) => {

  //playing audio for the first time.
  // if(soundObj === []) {
    const playbackObj = new Audio.Sound();

    const status = await playbackObj.loadAsync(
      audio,
      { shouldPlay: true }
    );



    // currentAudios.includes(audio)
    //   ? setCurrentAudios(currentAudios.filter((item) => audio !== item))
    //   : setCurrentAudios(prevArray => [...prevArray, audio]);

    playbackObjs.includes(playbackObj)
      // ? setPlaybackObjs(playbackObjs.filter((item) => playbackObj !== item))
      ? unloadPlaybackObj(playbackObj)
      : setPlaybackObjs(prevArray => [...prevArray, playbackObj]);

    console.log(status.uri)

    // const unloadPlaybackObj = async (playbackObj) => {
    //   setPlaybackObjs(playbackObjs.filter((item) => playbackObj !== item))
    //   await playbackObj.unloadAsync()
    // }



///////////////////////11월 19일 /////////////////























    // soundObjs.includes(status)
    //   ? setSoundObjs(soundObjs.filter((item) => status !== item))
    //   : setSoundObjs(prevArray => [...prevArray, status]);

    


    // setCurrentAudio(prevArray => [...prevArray, audio]);
    // setPlaybackObj(prevArray => [...prevArray, playbackObj]);
    // setSoundObj(prevArray => [...prevArray, status]);
    // return
  // };

  //pause audio
  // if(soundObjs.isLoaded && soundObjs.isPlaying) {
  //   const status = await playbackObj.setStatusAsync({ shouldPlay: false });
    // return setSoundObj(status);
  // }

  // //resume audio
  // if(soundObj.isLoaded &&
  //    !soundObj.isPlaying &&
  //    currentAudio === audio ) {
  //      const status = await playbackObj.playAsync();
  //      return setSoundObj(status);
  //    }  







  // //playing audio for the first time.
  // if(soundObj === null) {
  //   const playbackObj = new Audio.Sound();

  //   const status = await playbackObj.loadAsync(
  //     audio,
  //     { shouldPlay: true }
  //   );
  //   setCurrentAudio(audio);
  //   setPlaybackObj(playbackObj);
  //   setSoundObj(status);
  //   return
  // };

  // //pause audio
  // if(soundObj.isLoaded && soundObj.isPlaying) {
  //   const status = await playbackObj.setStatusAsync({ shouldPlay: false });
  //   return setSoundObj(status);
  // }

  // //resume audio
  // if(soundObj.isLoaded &&
  //    !soundObj.isPlaying &&
  //    currentAudio === audio ) {
  //      const status = await playbackObj.playAsync();
  //      return setSoundObj(status);
  //    }  
};

//playing sound finishes



  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>

        <Button onPress={() => handleAudioPlayPause(music1)} title='test sound!'></Button>
        
        <SectionList
          ListHeaderComponent={<Text style={styles.screenHeader}>Sounds</Text>}
          
          contentContainerStyle={{paddingBottom:30, paddingTop:20, paddingLeft:20, paddingRight: 20}} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          sections={sounds}
          keyExtractor={(item, index) => item + index}
          renderItem={flatList}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.soundCardHeader}>{title}</Text>
          )}
        />  

      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#00003f',
  },
  container: {
    flex: 1,
    backgroundColor: '#00003f',
    // justifyContent: 'center',
  },
  row: {
    // flex: 1,
    justifyContent: "space-between",
    marginVertical: 15,
  },
  soundCard: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeader: {
    fontSize: 50,
    color: '#fff',
    marginBottom: 40,
  },
  soundCardHeader: {
    fontSize: 20,
    color: '#fff',
  },
});

export default SoundsScreen;