import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

import { firebase } from './src/firebase/config';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, RegistrationScreen, StatusScreen } from './src/screens';
import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

//images
const logo = require("./assets/logo_transparent.png");

const database = firebase.database();

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('success')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.ref().once('value').then((snapshot) => {
          snapshot.forEach(function(groupSnapshot) {
            console.log(groupSnapshot.key);
            database.ref(groupSnapshot.key+'/'+user.uid).once('value').then((userSnapshot) => {
              if (userSnapshot.exists()) {
                setUser(userSnapshot.val());
                setUserGroup(groupSnapshot.key);
                console.log('Welcome back to the '+groupSnapshot.key+' group. We hope you brought bubble tea.')
                setLoading(false);
              } else {
                console.log('You are not a member of '+groupSnapshot.key+'.');
                setLoading(false);
              }
            })
            .catch((error) => {
                console.log('Hm it seems we have lost our member list... Allow us to try again?')
                console.log("ERR — #1: "+error);
                setLoading(false);
            });
          });
        })
        .catch((error) => {
            console.log('The National Council of Doormie Groups didn\'t pick up. Try again?')
            console.log("ERR — #2: "+error);
            setLoading(false);
        });
        /*
        .doc(user.uid)
        .get()
        .then((document) => {
            const userData = document.data()
            setUser(userData)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false)
        });
        */
      } else {
        setLoading(false)
        console.log('GASP I don\'t recognize you... Are you new here?')
      }
    });
  }, []);

  if (loading) {
    console.log('i am loading........')
    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source={logo}
        />
      </View>
    )
  } else {
    console.log('all done! :>')
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'Status' : 'Login'} screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user}/>}
          </Stack.Screen>
          <Stack.Screen name='Status' component={StatusScreen}></Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column'
  },
  logo: {
    width: 100,
    height: 100,
  },
});