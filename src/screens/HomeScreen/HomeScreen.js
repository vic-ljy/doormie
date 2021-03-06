import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView, Button } from 'react-native'
import styles from './styles';
import Sticky from './components';
import { firebase } from '../../firebase/config';

export default function HomeScreen(props) {
  const nav = props.navigation;
  /*
  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])

  const entityRef = firebase.firestore().collection('entities');
  const userID = props.extraData;
  //props = [object Object]
  //props.extraData = undefined;
  //trying to get: props.extraData.id;
  console.log("poopoo is " +userID);

  useEffect(() => {
    firebase.firestore().collection('entities')
      .where("authorID", "==", userID)
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
            const entity = doc.data()
            entity.id = doc.id
            newEntities.push(entity)
          });
          setEntities(newEntities)
        },
        error => {
          console.log(error)
        }
      )
  }, [])
  
  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then(_doc => {
          setEntityText('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        });
    }
  }
  
  const renderEntity = ({item, index}) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    )
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new entity'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none" />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        

      </View>
      { entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true} />
        </View>
      )}

      
        
       {sticky notes: puff}
       <View style={styles.listContainer}>
          <Sticky></Sticky>
          <Sticky></Sticky>
          <Sticky></Sticky>
          
          <Button 
          onPress={() => {
          nav.navigate('Status');
          }} 
          style={{height: 130, width: 140}}/>
        </View>


    </View>
  )
  */
 return (<></>)
}