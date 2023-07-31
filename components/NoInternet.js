import React,{useState,useEffect}from 'react'
import { View,Text,StyleSheet } from 'react-native'
import  NetInfo  from '@react-native-community/netinfo'
import { useToast,HStack } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
const NoInternet = ({isConnected,setIsConnected}) => {
const toast=useToast()
    useEffect(() => {
 
        if(!isConnected){
      
            
          toast.show({
            title: 'No Internet Connection',
            description: 'Check your internet connection',
            status: 'warning',
            placement: 'bottom',
            style: {borderRadius: 20, width: '90%', marginBottom: 20},
          });
      
    
    
        }
    },[]
    )

    useEffect(() => {
       NetInfo.addEventListener(state => {
          setIsConnected(state.isConnected);
         
        });
      
      }, [isConnected])


      const tryAgain = () => {
        NetInfo.fetch().then(state => {
          setIsConnected(state.isConnected);
        });
      };
  return (

 <View style={styles.loading}>
        <View>
        <Text style={{color:'#00415e'}}>No internet connection</Text>
        <View style={{width:'100%',marginLeft:35}}>
        <Text style={{marginTop:2,alignSelf:'center',color:'#00415e'}} >Try Again</Text>
        </View>
        <HStack space={1} width='100%' alignSelf={'center'} >
        <Icon name='refresh-circle' size={40} color='#00415e' onPress={tryAgain} />
        </HStack>
        </View>
        
      </View>

  )
}

export default NoInternet

const styles=StyleSheet.create({

    
    loading: {
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        alignItems: 'center',
      },
})