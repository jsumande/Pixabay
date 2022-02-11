import React, { useState, useContext} from 'react';
import {SafeAreaView,StyleSheet,TextInput,View,Text,Button,TouchableOpacity} from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { SearchResultContext } from '../contexts/SearchResultContext';
import Icon from 'react-native-vector-icons/FontAwesome';

function Search() {

    const navigation = useNavigation(); 
    const {result , updateResult,id,updateId} = useContext(SearchResultContext);
    return(

        <SafeAreaView  style={styles.searchView}>

            <TextInput
                style={styles.searchTextInput}
                placeholder="Search ...."
                onChange={ (e) => updateResult(e.nativeEvent.text)}
            />


            <View style={styles.TouchView}>
                <TouchableOpacity style={styles.TouchButton} onPress={() => navigation.reset({ index: 0,routes: [{ name: 'Result' }],})} >
                    <Text style={styles.Touchtext}><Icon name="search" color="white"  size={20}/> Search</Text>
                </TouchableOpacity>
            </View>

        
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
  
    // Search Screen Style
  
    searchView : {
      flex: 1,
      justifyContent: 'center'
    },
  
    searchTextInput : {
      backgroundColor: 'white',
      borderBottomColor: 'white',
      width : '80%',
      alignSelf: 'center',
      borderRadius : 5,
      marginBottom : '5%',
    },

    // Button

    TouchView:{
        width : '100%',
        alignItems:'center'
    },

    Touchtext : {
        color: 'white',
        fontSize:20
    },

    TouchButton : {
        alignItems:'center',
        justifyContent:'center',
        height : 50,
        width : '50%',
        borderRadius : 5,
        backgroundColor:'#cc1f36'
    },

  
  });

export default Search;