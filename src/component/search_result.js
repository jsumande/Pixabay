import React, { useState, useContext,useEffect} from 'react';
import {SafeAreaView,StyleSheet,TextInput,View,Text,Button,FlatList,ActivityIndicator,Image,TouchableOpacity} from 'react-native';
import { SearchResultContext } from '../contexts/SearchResultContext';
import { useNavigation  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {REACT_APP_ACCESS_LINK, REACT_APP_PIXABAY_API_KEY} from "@env";

function SearchResult() {

    const navigation = useNavigation(); 
    const {result , updateResult,id,updateId} = useContext(SearchResultContext);
    const [loading , setLoading] = useState(true);
    const [resultData, setResultData] = useState([]);


    useEffect( () =>{

        fetch(REACT_APP_ACCESS_LINK+'?key='+REACT_APP_PIXABAY_API_KEY+'&q='+result+'&image_type=photo&pret'
           ,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
            })
          .then((response) => response.json())
          .then((json) => {

            if(json) {
                setLoading(false)
            }

            setResultData(json.hits)

            })
          .catch((error) => console.error(error))
          .finally();

    },[])

    return(

        <SafeAreaView  style={styles.searchView}>

        <View style={styles.search}>
            <Text>You Search for {result}</Text>

            <View style={styles.searchTouchView}>
                <TouchableOpacity style={styles.searchTouchButton} onPress={() => { navigation.reset({ index: 0,routes: [{ name: 'Search' }],}) } } >
                    <Text style={styles.searchTouchtext}><Icon name="search" color="white"  size={15}/> Again Search</Text>
                </TouchableOpacity>
            </View>

        </View>


          {loading ? <ActivityIndicator size="large" color="#00ff00" /> :
             
          <View style={{flex : 1}}>
        
            <FlatList
                style={{marginBottom:25}}
                data={resultData}
                keyExtractor={item => item.id}
                renderItem={ ({item}) =>
                     (

                    <View style={{ flexDirection:'column',marginBottom:15}}>

                            <View style={{alignSelf:'center',padding:30}}>
                                <Image
                                    style={{width: item.previewWidth, height: item.previewHeight}}
                                    source={{uri:item.largeImageURL}}
                                />
                            </View>
                          
                            <View style={{alignSelf:'center',flexDirection:'row'}}>
                                <Text style={styles.likes}><Icon name="thumbs-o-up" color="black"  size={20}/> {item.likes}</Text>
                                <Text style={styles.likes}><Icon name="comment" color="black"  size={20}/> {item.comments}</Text>
                                <Text style={styles.likes}><Icon name="eye" color="black"  size={20}/> {item.views}</Text>
                            </View>

                            <View style={styles.TouchView}>
                                <TouchableOpacity style={styles.TouchButton} onPress={() => { updateId(item.id) ,navigation.navigate('Detail')} 
                                    
                                    } >
                                    <Text style={styles.Touchtext}><Icon name="image" color="white"  size={20}/> Detail</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    )
                }
            />

          </View> 
          
        }  

        </SafeAreaView >

    )
}

const styles = StyleSheet.create({

    search: {
        marginTop:15,
        alignItems:'center',
        marginBottom : 15,
    },

    searchTouchView:{
        marginTop : 10,
        width : '80%',
        alignItems:'center'
    },

    searchTouchtext : {
        color: 'white',
        fontSize:15
    },

    searchTouchButton : {
        alignItems:'center',
        justifyContent:'center',
        height : 40,
        width : '70%',
        borderRadius : 5,
        backgroundColor:'#28060a'
    },
  
    // Search Screen Style
  
    searchView : {
      flex: 1,
      paddingLeft : 20,
      paddingRight : 20,
    },
  

    logo: {
        width: 66,
        height: 58,
      },

    // Like

    likes : {
        marginLeft:10,
        marginBottom:10,
        color : 'black'
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
        width : '70%',
        borderRadius : 5,
        backgroundColor:'#cc1f36'
    },
  
  });

export default SearchResult;