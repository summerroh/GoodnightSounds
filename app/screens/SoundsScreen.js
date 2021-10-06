import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from './conponents/Screen';


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
      
        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},

        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},
        
        {name: 'Rain',
        iconName: 'weather-rainy'},
      
        {name: 'Bird',
        iconName: 'airplane'},
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},

        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},
        
        {name: 'Rain',
        iconName: 'weather-rainy'},
      
        {name: 'Bird',
        iconName: 'airplane'},
      ]]
  },
  {
    title: "Train Sounds",
    data: [[
        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},

        {name: 'Rain2',
        iconName: 'weather-rainy'},
      
        {name: 'Bird2',
        iconName: 'airplane'},
      
        {name: 'Thunder2',
        iconName: 'cloud'},
        
        {name: 'Rain',
        iconName: 'weather-rainy'},
      
        {name: 'Bird',
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
        // nestedScrollEnabled 
        // ListHeaderComponent={() => {
        //   return (<Text style={styles.soundCardHeader}>Rain Sounds</Text>)
        // }}
        
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
        
      {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Text style={styles.screenHeader}>Sounds</Text>
        <SectionList
          sections={sounds}
          keyExtractor={(item, index) => item + index}
          renderItem={flatList}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.soundCardHeader}>{title}</Text>
          )}
        />  

          
            {/* </SafeAreaView> */}
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
    justifyContent: 'center',
    padding: 20,
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