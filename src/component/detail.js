import React, { useState, useContext,useEffect} from 'react';
import {SafeAreaView,StyleSheet,TextInput,View,Text,TouchableOpacity ,ScrollView,Image,} from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import { SearchResultContext } from '../contexts/SearchResultContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {REACT_APP_ACCESS_LINK, REACT_APP_PIXABAY_API_KEY} from "@env"
function Detail() {

    const navigation = useNavigation(); 
    const {result , updateResult,id,updateId} = useContext(SearchResultContext);

    const [resultData, setResultData] = useState([]);


    useEffect( () =>{

        fetch(REACT_APP_ACCESS_LINK+'?key='+REACT_APP_PIXABAY_API_KEY+'&id='+id+'&image_type=photo&pretty'
           ,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
            })
          .then((response) => response.json())
          .then((json) => {
            // console.log(json.hits[0]);
            setResultData(json.hits[0])

            })
          .catch((error) => console.error(error))
          .finally();

    },[])

    return(

        <SafeAreaView style={{flex : 1}}>
            <View style={styles.searchView}>

                <View style={{flex:1}}>
                    <View style={styles.imageGroup}>
                        <Image style={{width: '100%', height: '70%'}} source={{uri:resultData.largeImageURL}}/>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <ScrollView style={styles.scrollView}>
                        {/* Details  */}
                            
                            <View style={styles.scrollView_Item}>

                                <Image style={styles.profile} source={{uri:resultData.userImageURL}}/>
                                <Text style={styles.profile_text}>{resultData.user}</Text>

                                <View style={styles.TouchView}>

                                    <TouchableOpacity style={styles.TouchButton} onPress={() => { updateResult(resultData.tags) ,navigation.reset({ index: 0,routes: [{ name: 'Result' }],})}} >
                                        
                                        <Text style={styles.Touchtext}><Icon name="tags" color="white"  size={20}/> {resultData.tags}</Text>

                                    </TouchableOpacity>

                                </View>

                                <Text style={styles.image_detail}><Icon name="download" color="black"  size={15}/> {resultData.downloads}</Text>
                                <Text style={styles.image_detail}><Icon name="image" color="black"  size={15}/> {resultData.collections}</Text>

                            </View>
                    </ScrollView>
                </View>

            </View> 
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({


    // Search Screen Style
  
    searchView : {
      flex: 1, 
      padding : 10,
    },


    imageGroup : {
        width: '100%', height: '100%',
    },

    //Scrollview 

    scrollView: {
        marginHorizontal: 15,
    },
    
    scrollView_Item : {
        flex : 1,
        alignItems:'center'
    },
    
    profile : {
        width: 95, 
        height: 95,
        borderRadius : 50,
        marginBottom : 5,
    },

    profile_text :{
        fontSize:30,
        paddingBottom : 5,
    },

    image_detail : {
        marginTop : 5,

    },

     // Button

     TouchView:{
        width : '100%',
        alignItems:'center'
    },

    Touchtext : {
        color: 'white',
        fontSize:15
    },

    TouchButton : {
        alignItems:'center',
        justifyContent:'center',
        height : 30,
        width : '100%',
        borderRadius : 5,
        backgroundColor:'#cc1f36'
    },
    

  
  });

export default Detail;