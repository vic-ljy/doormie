import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';



//stickynote component
class Sticky extends React.Component{
    constructor(props) {
        super(props);
    }

    closeSticky() {

    }

    render(){
        return(
            
            <View style={styles.sticky}>
                <Text>Hello</Text>
            </View>
        );
    }
}

export default Sticky;