
import React, { useState,useContext } from 'react';
import {SafeAreaView,StyleSheet,TextInput,View,Text,Button,} from 'react-native';
import {REACT_APP_ACCESS_LINK, REACT_APP_PIXABAY_API_KEY} from "@env"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contexts
import SearchResultProvider from './src/contexts/SearchResultContext.js';

// Component
import Search from './src/component/search.js';
import SearchResult from './src/component/search_result.js';
import DetailResult from './src/component/detail.js';



const Stack = createNativeStackNavigator();

function SearchScreen() {
  console.log(REACT_APP_ACCESS_LINK)
  return (
    <Search/>
  );
}

function ResultScreen() {

  return (
    <SearchResult/>
  );
}


function DetailScreen(route){
 

  return (
    <DetailResult/>
)}

const App = () => {
  return (
    <NavigationContainer>
      <SearchResultProvider>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </SearchResultProvider>
  </NavigationContainer>
  );
};




export default App;
