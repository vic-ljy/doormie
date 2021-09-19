import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    personalStatusContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F5CC22',
        width: '100%',
        padding: '7%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }, 
    boxName: {
      color: '#3E3E3E',
      fontSize: 24,
      fontWeight: '700',
      marginTop: 5,
    },
    boxStatus: {
      marginTop: 3,
      color: '#3E3E3E',
      fontSize: 16,
      fontWeight: '200'
    },
    topBar: {
      paddingTop: 50,
      paddingBottom: 50,
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf:'center',
      textAlign: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    logoTop: {
      width: 80,
      height: 40,
      marginLeft: 50
    },
    forImage: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%'
    },
    forCode: {
      paddingTop: 30
    },
    code: {
      fontSize: 45,
      color: '#BEBEBE'
    },
    personalStatusBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '65%',
        alignSelf:'center'
    },
    setStatus: {
        height: 300,
        width: '95%',
        justifyContent: 'center',
        backgroundColor: '#F5CC22',
        alignSelf:'center',
        textAlign: 'center',
        borderRadius: 15,
        padding: 40,
        flexDirection: 'column',
    },
    setStatusTitle: {
      color: '#7B6611',
      fontSize: 28,
      flexDirection: 'column',
    //   fontWeight: 300
    },
    subheading: {
      height: 50,
      borderRadius: 5,
      marginTop: 15,
      marginBottom: 20,
      flexDirection: 'row',
      backgroundColor: '#F3DD82'
    },
    textInput: {
      height: 40,
      width: "75%",
      marginLeft: 20,
      alignSelf:'center',
      color: '#6A5A16'
    },
    closeButton: {
      width: 16,
      height: 16
    },
    closeButtonParent: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      marginLeft: 8
    },
    statusEventContainer: {
        width: 318,
        height: 87,
        top: 232,
        left: 21,
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'baseline',
        paddingTop: 15,
        paddingBottom: 15, 
        paddingRight: 10,
    },
    
    selfProfileLetter: {
        backgroundColor: 'white',
        borderRadius: 100,
        borderColor: '#FF9595',
        borderStyle: 'solid',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    },

    schedulingStatusView: {
      backgroundColor: '#F5CC22',
      width: '100%',
      height: '80%',
      position: 'absolute',
      bottom: 0,
      margin: 0, 
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
    },

    scheduleItem: {
      backgroundColor: 'white',
      marginTop: 15,
      width: '90%',
      alignSelf: 'center',
      padding: 20,
      borderRadius: 15,
      flexDirection: 'row'
    },

    statusCircle: {
      marginRight: 10
    },

    datePickBox: {
      flexDirection: 'row',
      width: '100%',

    }
    
})