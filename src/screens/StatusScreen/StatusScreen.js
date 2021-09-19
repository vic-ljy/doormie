import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, Dimensions, TouchableOpacity, View, ScrollView, Button, SafeAreaView, Image } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { firebase } from '../../firebase/config'; 
import PersonalStatus from './PersonalStatus';
import upcomingEvents from './realtime-data';

const image1 = require('./status1.png');
const image2 = require('./status2.png');
const logo = require("./logo-h.png");
const scheduleStatus = require("./test.png")
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function StatusScreen({navigation}) {
    const database = firebase.database();
    let propsList;

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null);
    const [userGroup, setUserGroup] = useState(''); //ABC123
    const [userName, setUserName] = useState(''); //'vicky'
    const [groupData, setGroupData] = useState({});
    const [userData, setUserData] = useState({});
    const [userScheduleData, setUserScheduleData] = useState({});
    
    /*
    [[startTime, duration, status, desc],[startTime, duration, status, desc], ...]
    
    userID

    NO_GROUP:
        user1ID:
            name: 'name',
            schedule:
                YYMMDDHHMM: -> 2109181736
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
                startTime:
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
        user2ID:
            name: 'name',
            schedule:
                YYMMDDHHMM: -> 2109181736
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
                startTime:
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
        user3ID:
            name: 'name',
            schedule:
                YYMMDDHHMM: -> 2109181736
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
                startTime:
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
        user3ID:
            name: 'name',
            schedule:
                YYMMDDHHMM: -> 2109181736
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
                startTime:
                    duration: (EITHER # mins or 'indefinite'),
                    status: ('away','quiet','chill'),
                    desc: 'here goes thy description.......'
    */

    useEffect(() => {
        console.log("loading = "+loading);
        //const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
                database.ref().once('value').then((snapshot) => {
                    snapshot.forEach(function(groupSnapshot) {
                        console.log(groupSnapshot.key);
                        database.ref(groupSnapshot.key+'/'+user.uid).once('value').then((userSnapshot) => {
                            setUser(userSnapshot.val());
                            if (userSnapshot.exists()) {
                                let groupData = groupSnapshot.val(); //OBJECT CONTAINING ALL DATA UNDER GROUP ID connychou
                                setGroupData(groupSnapshot.val());
                                setUserGroup(groupSnapshot.key); //userGroup
                                console.log(userGroup);
                                let userData = groupData[user.uid]; //OBJECT CONTAINING ALl DATA UNDER USER ID connychou
                                setUserData(groupData[user.uid]);
                                setUserName(groupData[user.uid].name); //userName
                                
                                let userScheduleData = groupData[user.uid.schedule];
                                

                                
                                console.log('Welcome back to the '+groupSnapshot.key+' group, '+groupData[user.uid].name+'. We hope you brought bubble tea.');
                                setLoading(false);
                            } else {
                                console.log('You are not a member of '+groupSnapshot.key+'...');
                                setLoading(false);
                            }
                        })
                        .catch((error) => {
                            console.log('Hm it seems we have lost our member list... Allow us to try again?');
                            console.log("ERR — #1: "+error);
                            setLoading(false);
                        });
                    });
                })
                .catch((error) => {
                    console.log('The National Council of Doormie Groups didn\'t pick up. Try again?');
                    console.log("ERR — #2: "+error);
                    setLoading(false);
                });
            } else {
                console.log('GASP I don\'t recognize you... Are you new here?');
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        //console.log('hiello');
        return (<></>)
    } else {
        //console.log('biyebye');
        
        propsList = {user, userGroup, userName, groupData, userData};
        return(
            <>
            <SafeAreaView>
            <ScrollView>
            <View style={styles.topBar}>
                  <View style={styles.forImage}>
                    <Image style={styles.logoTop} source={logo}></Image>
                  </View>
                  <View style={styles.forCode}>
                    <Text style={styles.code}>L C J R V A</Text>
                  </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 100}}>
                <StatusBox name="Jennifer Zu" color="#FFA3CF" status="at the library" borderColor="#95B2FF" image={image1} userId="TzfghLd5TyW4RTJ9j9xv4Z4Hajz2" {...{propsList}}></StatusBox>
                <StatusBox name="Liam Lili" color="#80D1FF" status="in a meeting" borderColor="#FF9595" image={image2} userId="pduxkbXflWMNaEVODN65l2fcyc92" {...{propsList}}></StatusBox>
                <StatusBox name="Ray Wei" color="#A3B7FF" status="playing Valorant" borderColor="#7E7E7E" image={image1} userId="zDYDzubBHnQFjo7263znPy2f9mK2" {...{propsList}}></StatusBox>
                <StatusBox name="Jake Xi" color="#91DDA6" status="taking a nap" borderColor="#FF9595" image={image1} userId="2d2fbNP63chKs1GqWtXuNHTKii13" {...{propsList}}></StatusBox>
            </View>
            </ScrollView>
            </SafeAreaView>
            
            <PersonalStatus name='Jacob Hallman'/>
            </>
        );
    }

    
}


{/* components */}

class StatusBox extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = { status: 'busy', borderColor: 'white', extendedHidden: false, 
        moreStatus: upcomingEvents, 
        userIden: {'29039485': {
            schedule: {
                status: 'hi',
                desc: 'hi',
                duration: 130,
                statusColor: 'red'
            }
        }}
        };
    }

    toggleVisibility() {
        if(this.state.extendedHidden == true) {
          this.setState({extendedHidden: false});
          //this.setState({events: this.props.userData});
        } else {
          this.setState({extendedHidden: true});
        }
    }
    

    toDate(time) {
        //time format: YYMMDDHHMM
        //new format: '2011-04-11T10:20:30Z'
        time = time.toString();
        return new Date(`20${time.substr(0,2)}`,time.substr(2,2),time.substr(4,2),time.substr(6,2),time.substr(8,2));
    }

    //time math functions
    getStartDate(startTime) {
        return new Date(this.toDate(startTime).toString());
    }
    getEndDate(startTime, duration) {
        return new Date((this.toDate(startTime) + duration*60000).toString());
    }
    dateToDisplayTime(d) {
        //alert(d)
        let hour = d.getHours() + 11;
        let suffix;
        hour<23 ? suffix='a.m.' : suffix='p.m.';
        hour=(hour%12).toString();
        return `${hour}:${d.getMinutes().toString()} ${suffix}`;
    }
    
    /*arrayScheduleEvents(events) {
        let array = [];
        let eventKeys = Object.keys(events);

        eventKeys.forEach((key) =>{
            array.push(<StatusEvent status={events.status} desc={events.desc} time={events.duration}></StatusEvent>);
        });

        this.setState({eventArray: array});
        
    }*/

    render() {
        let customColor = this.props.color;

        {/*making list of upcoming status to display as flatlist, later firebase database8*/}
        let eventsList = {};
        let groupSchedule = this.state.moreStatus['A1B2C3'];
        //console.log(groupSchedule);

        let keysRoommates = Object.keys(groupSchedule);
        //console.log(keysRoommates);
        let numRoommates = keysRoommates.length;
        //console.log(numRoommates);

        let numEvents;
        let roommateKey;
        let eventTimeKeys;
        let path;

        //date time
        let startTimeA;
        let endTimeA;
        let displayTime;

        for(let i = 0; i < numRoommates; i++ ) {
            roommateKey = keysRoommates[i]
            //numEvents = groupSchedule[roommateKey];
            path = groupSchedule[roommateKey].schedule;
            eventsList[roommateKey] = [];
    
            eventTimeKeys = Object.keys(path);
    
            eventTimeKeys.forEach((key, index) => {
                startTimeA = this.getStartDate(key);
                endTimeA = this.getEndDate(key, path[key].duration);
                displayTime = `${this.dateToDisplayTime(startTimeA)} - ${this.dateToDisplayTime(endTimeA)}`;

                eventsList[roommateKey].push({status: path[key].status, statusdesc: path[key].desc,
                time: displayTime, statusColor: path[key].statusColor
                });
            });

            //console.log(eventsList);

            {/*need to do some math for time, not working rn */}
            
        }

        return (
            <>
            <View>
                {/*picture */}
                <View style={{width: 80,
                height: 80,
                borderRadius: 100,
                alignSelf: 'center',
                zIndex: 2, 
                borderWidth: 5, 
                borderColor: this.props.borderColor,
                backgroundColor: this.props.color}}>
                </View>
                  
                <TouchableOpacity
                    onPress={() => {
                    this.toggleVisibility();
                    this.setState({userIden: this.props.userId});
                    }}
                    >

                    <View
                      style={{ 
                        backgroundColor: this.props.color, 
                        width: 250,  
                        height:150, 
                        marginBottom: 30, 
                        marginTop: -30, 
                        borderRadius: 15, 
                        alignItems: 'center',
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        justifyContent: 'center'}}
                    >
                        <Text style={ styles.boxName }>{this.props.name}</Text>
                        <Text style={ styles.boxStatus }>{this.props.status}</Text>
                    </View>
                </TouchableOpacity>

                {/*hidden panel*/}
                        
            </View>

            <Modal isVisible={this.state.extendedHidden}>


                {/*picture */}
                <View style={{width: 100,
                  height: 100,
                  borderRadius: 100,
                  alignSelf: 'center',
                  marginBottom: -50,
                  marginTop: 180,
                  zIndex: 2, 
                  borderWidth: 5, 
                  borderColor: this.props.borderColor,
                  backgroundColor: this.props.color}}>
                </View>
                <View style={{ 
                  width: screenWidth, 
                  height: screenHeight, 
                  backgroundColor: this.props.color, 
                  alignSelf: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  paddingTop: 40,
                }}>
                <Button 
                    onPress={() => {
                    this.toggleVisibility();                    
                    }}
                    title='x'
                    style={{backgroundColor: this.props.color, width: 10, heihgt: 10, borderRadius: 100}}
                ></Button>

                  <Text style={ styles.boxName }>{this.props.name}</Text>
                  <Text style={ styles.boxStatus }>{this.props.status}</Text>
                  <View>

                {/*
                  <FlatList
                        data={eventsList[this.state.userIden]}
                        renderItem={({item}) => 
                        <View style={styles.scheduleItem}>
                            <View style={styles.statusCircle}>
                            <View style={{
                                width: 13,
                                height: 13,
                                borderRadius: 100,
                                backgroundColor: item.statusColor
                            }}>
                            </View>
                            </View>
                            <View>
                            <Text style={{fontSize: 8, color: '#C8C8C8'}}>{item.status}</Text>
                            <Text style={{fontSize: 14}}>{item.desc}</Text>
                            <Text style={{fontSize: 10, color: '#B1B1B1'}}>{item.duration}</Text>
                            </View>
                        </View> 
                        }
                    />
                    */}
                      
                  </View>

                  <ScrollView>
                      <View style={{flexDirection: 'row'}}>
                        <Image source={this.props.image} style={{
                            marginTop: 30,
                            paddingTop: 30,
                            marginBottom: 100,
                            width: 300,
                            flex: 4,
                            alignSelf: 'center'
                        }}/>
                        </View>
                  </ScrollView>

                   {/* NOT ENOUGH TIME, just to images? -- {eventsList[this.state.userIden]}*/}
                </View>
                
            </Modal>   
            </>
        );
    }
}

{/*eventComponent*/}
class StatusEvent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {};
  
    }
    
  
    render() {
      return (
          <View style={styles.statusEventContainer}>
              <View style={{width: 106, height: 12, top:20, left: 50}}>
                <Text style={{fontWeight: 'bold', fontSize: 8, color: '#C8C8C8'}}>{this.props.status}</Text>
              </View>
              
              <Text>{this.props.desc}</Text>
              <Text>{this.props.time}</Text>
          </View>
      );
    }
  }