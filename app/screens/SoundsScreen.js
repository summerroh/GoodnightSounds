import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../conponents/Screen'


const sounds = [
  {
    title: "Rainy Sounds",
    data: [[
      
        {name: 'Rain',
        iconName: 'weather-rainy'},
      
        {name: 'Bird',
        iconName: 'airplane'},
      
        {name: 'Thunder',
        iconName: 'cloud'},
      
        {name: 'Snow',
        iconName: 'weather-rainy'},
      
        {name: 'Puddle',
        iconName: 'airplane'},
      
        {name: 'Lake',
        iconName: 'cloud'},
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Train',
        iconName: 'weather-rainy'},
      
        {name: 'Subway',
        iconName: 'airplane'},
      
        {name: 'Car',
        iconName: 'cloud'},

        {name: 'Airplane',
        iconName: 'weather-rainy'},
      
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
  
  const [selectedName, setSelectedName] = useState(null);

  
  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedName ? "lightgray" : "#fff";
    const color = item.name === selectedName ? 'white' : 'black';

    return(
      <TouchableOpacity onPress={() => setSelectedName(item.name)} style={[styles.soundCard, {backgroundColor}]}>
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

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        
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