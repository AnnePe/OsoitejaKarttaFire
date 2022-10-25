import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, remove, ref, onValue } from'firebase/database';
import { Input,Button,Header, ListItem, Icon} from'react-native-elements';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBv1TBLMcaezybJKAMfWo0TlDA1S0G3X0s",
  authDomain: "osoitehaku.firebaseapp.com",
  projectId: "osoitehaku",
  storageBucket: "osoitehaku.appspot.com",
  messagingSenderId: "653302949444",
  appId: "1:653302949444:web:c072b1e7a242a8d0d2fe11"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Places({navigation}) {

const [items, setItems] = useState([]);
const [osoite, setOsoite] = useState('');
const [osoitteet, setOsoitteet] = useState([]);

const saveItem = () => {    //viittaus ja mitä viedään
    push(  
        ref(database, 'Osoitehaku/'), //viitaus
            { 'osoite': osoite }); //olio
}

const deleteItem = (item) => {    //viittaus ja mitä poistetaan
 // console.log ('deleteItem', items);
 // console.log ('deleteItem',  item);
  remove(ref(database, 'Osoitehaku/'+item));

}


useEffect(() => 
{const itemsRef = ref(database, 'Osoitehaku/');  
onValue(itemsRef, (snapshot) => {
  const data = snapshot.val();  
    setItems(Object.values(data)); 
    console.log(data);
    console.log(Object.values(data));
    console.log(Object.keys(data));
    const items = data ? Object.keys(data).map(key => ({ key, ...data[key]})):[];
      setOsoitteet(items);
    });
  }, []);


 
  return (
    <View style={styles.container}>
       
    <Input placeholder='Type in address' label="PLACEFINDER" onChangeText={(osoite) => setOsoite(osoite)} style={styles.textBoxes}  />  
   
    <View >
    <Button icon={{name: 'save'}} title="Save"  onPress={saveItem} > </Button>
    
    </View >
    <View>
    <FlatList 
          data={osoitteet} 
          renderItem={({item}) => 
            <ListItem bottomDivider onLongPress={() => deleteItem(item.key)} onPress={() => navigation.navigate('Map', { data: item.osoite} )}>
              <ListItem.Content>
              <ListItem.Title> {item.osoite} </ListItem.Title>
              </ListItem.Content>
              
              <Text>Show on map</Text>
                 <Icon name="arrow-right" label='show on map' onPress={() => navigation.navigate('Map', { data: item.osoite} )} />
              
            </ListItem  > 
           } 
           keyExtractor={item => item.id}    
        />     
    </View>  
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    padding:2,
    alignContent:'center',
     
  },
  
});

