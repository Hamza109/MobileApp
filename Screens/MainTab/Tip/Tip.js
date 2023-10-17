import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert, SafeAreaView } from 'react-native';
import { Fab, HStack } from 'native-base';
import { Modal,Portal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { backendHost } from '../../../components/apiConfig';
const Tip = ({tip,onDismiss}) => {
  const tips = [
    {"tip_date": "2022-05-24T11:31:49.000+00:00", "tip_id": 3, "tip_status": 0, "tip_title": "A apple a day keeps a doctor awayss", "user_id": 5},
    {"tip_date": "2022-05-24T11:32:25.000+00:00", "tip_id": 4, "tip_status": 1, "tip_title": "diksha is testing tip functionality in uat ", "user_id": 5},
    {"tip_date": "2022-10-20T11:37:23.000+00:00", "tip_id": 5, "tip_status": 1, "tip_title": "Hi I Am Diksha Pandita. I am working the tip functionality in mobile app for both android and i phone . All- Cures is a good product and i am enjoying working on it ", "user_id": 3},
    {"tip_date": "2022-05-24T11:37:23.000+00:00", "tip_id": 7, "tip_status": 1, "tip_title": "hi arnav is good boy", "user_id": 4},
    {"tip_date": "2022-05-24T04:37:23.000+00:00", "tip_id": 8, "tip_status": 0, "tip_title": "diksha hamza", "user_id": 6}
  ];
  

  const [data,setData]=useState([])
  const [hasEntriesForToday, setHasEntriesForToday] = useState(false);

  const today = new Date().toISOString().split('T')[0]; // Get today's date


  const tipData=()=>{

    axios.get(`${backendHost}/tip/get`)
        
    .then(res => {


      const filteredData = res.data.filter(tip => tip.tip_date.startsWith(today));
      setData(filteredData)
     
      setHasEntriesForToday(filteredData.length>0)
 
    })
    .catch(error=>{
console.log(error)
    })
 
    }
    



useEffect(()=>{


  tipData()
},[])
  const containerStyle = {backgroundColor: 'white', padding: 9,margin:12,maxHeight:300,borderRadius:20};
  const renderItem = ({ item, index }) => {
    return (

        <View>
            <View style={styles.modalHeader}>
            <HStack>
              <MaterialIcons name="book" size={19} color="#00415e" />
              <Text style={{ color: '#00415e', fontFamily: 'Raleway-Bold' }}>Tip {index+1}</Text>
            </HStack>
            </View>
      <View style={styles.tipView}>
        <View style={styles.tipBody}>
        
          <Text style={styles.tipTitle}>{item.tip_title}</Text>
        </View>
      </View>
      </View>
      
    );
  };

  return (
    <View style={{zIndex:999}}>
      <Fab
        renderInPortal={false}
        zIndex={3}
        bottom={10}
        height={12}
        width={12}
        p="2"
        onPress={onDismiss}
        shadow={2}
        background="#00415e"
        icon={<MaterialIcons name={tip ? 'lightbulb-on' : 'lightbulb-outline'} size={25} color={tip ? 'yellow' : 'white'} />}
      />
<View>
<Portal>
<Modal visible={tip} onDismiss={onDismiss} contentContainerStyle={containerStyle}>

<FlatList data={data} renderItem={renderItem} 
ListEmptyComponent={() =>
  !hasEntriesForToday ?  <View>

<View style={styles.tipView}>
<View style={styles.tipBody}>

<Text style={[styles.tipTitle,{textAlign:'center'}]}>No tip of the day</Text>
</View>
</View>
</View> : null
}
/>
        </Modal>
      </Portal>


      {/* <Modal isOpen={tip} size="xl" onClose={() => setTip(false)} scrollable={false} >
        <Modal.Content maxHeight={350}>
          <Modal.Header bg="aliceblue" _text={{ color: '#00415e' }}>
            <HStack>
              <MaterialIcons name="book" size={22} color="#00415e" />
              <Text style={{ color: '#00415e', fontFamily: 'Raleway-Bold' }}> Tip of the day</Text>
            </HStack>
          </Modal.Header>
          <Modal.Body p="2" style={styles.background}>
            <FlatList data={DATA} renderItem={renderItem} />
          </Modal.Body>
        </Modal.Content>
      </Modal> */}
      </View>
    </View>
  );
};

export default Tip;

const styles = StyleSheet.create({
  tipView: {
    marginBottom: 2,
  },
  modalHeader:{
  backgroundColor:'aliceblue',
  padding:10,
  justifyContent:'center',
  },
  tipTitle: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    marginLeft: 10,
    color: '#00415e',
    textAlign: 'left',
  },
  tipDate: {
    fontFamily: 'Raleway-Light',
  },
  tipBody: {
    padding: 20,
    flexDirection: 'row',
  },
  tipIcon: {
    marginTop: 5,
    justifyContent: 'center',
    height: 100,
  },
  background: {
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
  },
});