import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, ScrollView, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function StatusScreen({navigation}) {
    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <StatusBox name='Razi Syed' color='blue'></StatusBox>
            <StatusBox name='Connie Wang' color='pink'></StatusBox>
            <StatusBox name='Vicky Li' color='yellow'></StatusBox>
            <StatusBox name='Jenna Xiao'color='purple'></StatusBox>
        </View>
    );
}


{/* components */}

class StatusBox extends React.Component{
    constructor(props) {
        super(props);

        this.state = {status: 'busy'}
    }

    render(){


        return(
            
            <View style={styles.statusBox} style={{backgroundColor: this.props.color}}>
                <Text>{this.props.name}</Text>
                <Text>{this.state.status}</Text>
            </View>
        );
    }
}