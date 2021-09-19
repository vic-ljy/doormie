import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Button, Dimensions, Alert } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import Modal from 'react-native-modal';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import upcomingEvents from './realtime-data';
import DateTimePicker from '@react-native-community/datetimepicker';

const database = firebase.database();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const clear = require("./clear.png");

var radio_props = [
  {label: 'Away from home', value: 0 },
  {label: 'Quiet Please', value: 1 },
  {label: 'Chilling', value: 2 }
];

var groupData = undefined;
const groupId = 'A1B2C3';
const userId = '2d2fbNP63chKs1GqWtXuNHTKii13'

const userScheduleYay = [
  {
    activity: 'Drinking at the bar',
    duration: '11:30-12:30',
    status: 'Away From Home',
    color: '#FF9595'
  },
  {
    activity: 'Drinking at the home',
    duration: '1:30-3:30',
    status: 'Quiet Time',
    color: '#95B3FF'
  },
  {
    activity: 'Drinking at the store',
    duration: '4:30-5:00',
    status: 'Quiet Time',
    color: '#95B3FF'
  },
  {
    activity: 'Drinking at the supermarket',
    duration: '6:30-11:30',
    status: 'Away From Home',
    color: '#FF9595'
  }
]

let date = new Date();


let usersUpcomingStatuses = [];
//@RAZI usersUpcomingStatuses[0] is an array of objects that contain all the info you should need for the flatlist
//@CONNIE usersUpcomingStatuses is a 2D array of ^ for each of the 4 users (in order: jenna, razi, connie, vicky)
for (let i=0; i<4; i++) {
  //HEREHEREHERE @ vicky poo ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  for(var child=upcomingEvents[groupId][userId].firstChild;
    child;
    child=child.nextSibling){
    usersUpcomingStatuses.push(child);
  }
  /*
  let object = upcomingEvents[groupId][userId].schedule;
  object.forEach((scheduleChild) => {
    usersUpcomingStatuses.push(scheduleChild);
  });
  */
  /*
  var userScheduleChildren = upcomingEvents[groupId][userId].schedule.children;
  let length = Object.keys(userScheduleChildren)
  for (var i = 0; i < userScheduleChildren.length; i++) {
    var upcomingStatus = userScheduleChildren[i];
    a.push(upcomingStatus);
  }
  */
} //is userSchedChild an object bc if so u can't use length
console.log(usersUpcomingStatuses);

//uhhhh idk i just followed soemthing on stack overflow lol
//it's just the .children of some node under upcomingEvents oooooh i see what you mean wait but it should be a pr ok in that case just do a for each ok u got it right 

/*
var RadioButtonProject = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
    }
  },
  render: function() {
    return (
      <View>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    );
  }
});*/





class RadioButtonProject extends React.Component{
  
  constructor(props) {
    super(props);
  }

  getInitialState() {
    return ({value: 0});
  }
  
  select_function(value) {
    console.log(value);
    addScheduledStatus(0, 0, value+1, '');
    function addScheduledStatus(startTime, endTime, status, desc) {
      let duration;
      let statusName = 0;
    
      if (endTime==0) { //endTime = 0 when status lasts indefinitely
        duration = 0;
      } else {
        duration = 60000*(toDate(endTime)-toDate(startTime));
      }
      
      if (status == 1) {
        statusName = "Away from home";
      } else if (status == 2) {
        statusName = "Quiet Please";
      } else if (status == 3) {
        statusName = "Chilling";
      } else {
        statusName = "Error";
      }
    
    
      database.ref('NO_GROUP/2d2fbNP63chKs1GqWtXuNHTKii13/schedule/'+startTime).update({
        duration, //duration: duration
        status: statusName,
        desc: desc
      })
      {/*Alert.alert(statusName);*/}
    }
  }

  /*
  addScheduledStatus(startTime, endTime, status, desc) {
    let duration;
    let statusName = 0;
  
    if (endTime==0) { //endTime = 0 when status lasts indefinitely
      duration = 0;
    } else {
      duration = 60000*(toDate(endTime)-toDate(startTime));
    }
  
    if (status == 1) {
      statusName = "Away from home";
    } else if (status == 2) {
      statusName = "Quiet Please";
    } else if (status == 3) {
      statusName = "Chilling";
    } else {
      statusName = "Error";
    }
  
  
    database.ref(this.props.userGroup+'/'+this.props.userId+'/schedule').update(startTime, {
      duration, //duration: duration
      status: statusName,
      desc: desc
    })
    Alert.alert(statusName);
  }
  */

  render() {
    return(
      <View>
    
        <RadioForm
          radio_props={radio_props}
          initial={0}
          buttonColor={'#B09524'}
          labelColor={'#3D3D3D'}
          animation={true}
          selectedButtonColor={'#FF6666'}
          buttonSize={10}
          
          onPress={(value) => {this.setState({value:value}); this.select_function(value)}}
     
        />
      </View>
    );
  }
}

export default function PersonalStatus(props) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState();
  const [userGroup, setUserGroup] = useState(''); //group id, aka 'NO_GROUP'
  const [userName, setUserName] = useState(''); //'vicky'
  const [groupData, setGroupData] = useState({});
  const [userData, setUserData] = useState({});
  const [userSchedule, setUserSchedule] = useState([]);
  
  const [settingStatus, setSettingStatus] = useState(false);
  const [schedulingStatus, setSchedulingStatus] = useState(false);
  const [text, setText] = useState('');
  const [bottomMargin, setBottomMargin] = useState(-(screenHeight*0.6));

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
                database.ref(groupSnapshot.key+'/'+user.uid+'/schedule').once('value').then((scheduleSnapshot) => {
                  setUserId(user.uid);
                  let tempArray = [];
                  scheduleSnapshot.forEach(function(scheduledStatusSnapshot) {
                    let tempObject = new Object();
                    tempObject[scheduledStatusSnapshot.key] = scheduledStatusSnapshot.val();
                    console.log(scheduledStatusSnapshot.val());
                    tempArray.push(tempObject);
                  })
                  setUserSchedule(tempArray);
                })
                .catch((error) => {
                  console.log('Hm it seems we have lost our member list... Allow us to try again?')
                  console.log("ERR — #3: "+error);
                  setLoading(false);
                });
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
  
  //firebase stuff
  
  if (loading) {
    return (<></>)
  }

  return( 
    <>

    <View style={{
      position: 'absolute',
      bottom: bottomMargin,
      backgroundColor: '#F5CC22',
      width: '100%',
      padding: '7%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      transition: '1s' 
    }}> 
      <GestureRecognizer
        onSwipeUp={() => {setBottomMargin(0)}}
        onSwipeDown={() => {setBottomMargin(-(screenHeight*0.6))}}
      >
        <TouchableOpacity  
          onPress={() => {
            setSettingStatus(true);
          }}
        >
        
          <View style={styles.personalStatusBar}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.selfProfileLetter}>
                <Text style={{fontWeight:'bold', fontSize:28, color: '#555555'}}>{props.name.charAt(0)}</Text>
              </View>
            </View>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
              <Text style={{fontSize:24, fontWeight:'bold'}}>{props.name}</Text>
              <Text style={{fontSize:16}}>Stalking Razi</Text>
            </View>
          </View>
        </TouchableOpacity>  
      </GestureRecognizer>
      <View style={{height: screenHeight*0.6, paddingTop:20}}>
        <View
          style={{
            height: '75%'
          }}
        >
          <FlatList
            data={userScheduleYay}
            renderItem={({item}) => 
              <View style={styles.scheduleItem}>
                <View style={styles.statusCircle}>
                  <View style={{
                    width: 13,
                    height: 13,
                    borderRadius: 100,
                    backgroundColor: item.color
                  }}>

                  </View>
                </View>
                <View>
                  <Text style={{fontSize: 8, color: '#C8C8C8'}}>{item.status}</Text>
                  <Text style={{fontSize: 14}}>{item.activity}</Text>
                  <Text style={{fontSize: 10, color: '#B1B1B1'}}>{item.duration}</Text>
                </View>
              </View> 
            }
          />
        </View>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            bottom: 10,
            padding: 20,
            borderRadius: 30,
            backgroundColor: '#9E8727',
            width: '50%',
            alignSelf: 'center',
          }}
          onPress={() => {
            setSchedulingStatus(true);
          }}
        >
          <Text style={{alignSelf: 'center', color:'#F5CC22'}}>+ ADD STATUS</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    <Modal isVisible={settingStatus} 
        transparent={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setSettingStatus(false)}
    >
        <View style={styles.setStatus}>
          <Text style={styles.setStatusTitle}>
            Set Status
          </Text>
          <View style={styles.subheading}>
            <TextInput
                style={styles.textInput}
                value={text}
                placeholder="Status Name"
                placeholderTextColor="#C5A626"
                onChangeText={text => setText(text)}
              
            />
            <TouchableOpacity
                style={styles.closeButtonParent}
                onPress={() => setText("")}
            >
                <Image
                  style={styles.closeButton}
                  source={clear}
                />
            </TouchableOpacity>
          </View>
          <RadioButtonProject userId={userId}/>
        </View>
    </Modal>
    <Modal 
      isVisible={schedulingStatus} 
      onBackdropPress={() => setSchedulingStatus(false)}
      transparent={true}
      coverScreen={true} 
      style={{
        width: '100%',
        margin: 0
      }}
    >
        <View style={styles.schedulingStatusView}>
          <View style={styles.setStatus}>
            <Text style={styles.setStatusTitle}>
              Add Status
            </Text>
            <View style={styles.subheading}>
              <TextInput
                  style={styles.textInput}
                  value={text}
                  placeholder="Status Name"
                  placeholderTextColor="#C5A626"
                  onChangeText={text => setText(text)}
                
              />
              <TouchableOpacity
                  style={styles.closeButtonParent}
                  onPress={() => setText("")}
              >
                  <Image
                    style={styles.closeButton}
                    source={clear} 
                  />
              </TouchableOpacity>
            </View>
            <RadioButtonProject userId={userId}/>
            
            <Text>Start</Text>
          
            <DateTimePicker
              mode = 'time'
              value = {date}
            />
          
            <Text>End</Text>
            <DateTimePicker
              mode = 'time'
              value = {date}
            />
        </View>
      </View>
    </Modal>
    </>

  );
}

