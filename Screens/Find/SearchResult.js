import React, { useEffect, useState } from 'react'
import { Text, View ,TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'
import { FlashList } from '@shopify/flash-list'
import ContentLoader from '../../components/ContentLoader';
import { DOCTOR_MAIN_SCREEN } from '../../routes';
import { backendHost } from '../../components/apiConfig';
import DoctorsCard from '../../components/DoctorsCard';

const SearchResult = ({navigation,route}) => {

    const [cityName,setCityName]=useState(route.params.city)

    const [doctorName,setDoctorName]=useState(route.params.searchText)
    const [data,setData]=useState([])
    const [isLoaded, setIsLoaded] = useState(false);

   

 
    const renderItem = ({item}) => {
        let imageLoc = '';
        const imgLocation = item.content_location;
        if (imgLocation && imgLocation.includes('cures_articleimages')) {
          imageLoc =
            `https://all-cures.com:444/` +
            imgLocation.replace('json', 'png').split('/webapps/')[1];
        } else {
          imageLoc =
            'https://all-cures.com:444/cures_articleimages//299/default.png';
        }
    
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(DOCTOR_MAIN_SCREEN, {
                ids: item.map.rowno,
                firstName: item.map.docname_first,
                secondName: item.map.docname_last,
              })
            }>
            <DoctorsCard
              training={item.map.edu_training}
              firstName={item.map.docname_first}
              secondName={item.map.docname_last}
              rowno={item.map.rowno}
              primarySpl={item.map.primary_spl}
            />
          </TouchableOpacity>
        );
      };
    
      useEffect(()=>{

   console.log('city',cityName)
   console.log('docname',doctorName)
        const getResults=async ()=>{
            try{
            const response  = await fetch(
                `${backendHost}/SearchActionController?cmd=getResults&city=${cityName!==''?cityName:''}=&doctors=${doctorName!==null?doctorName:''}&Latitude=32.7266&Longitude=74.8570`,
              )
              const results = await response.json()
              console.log('results-->',results.map.DoctorDetails.myArrayList.length);
              setData(results.map.DoctorDetails.myArrayList) 
              setIsLoaded(true)
            }
              catch(error){
                console.error('Error fetching data:', error);
              }
        
    }
  
getResults()
},[])

  return (
    <>
    {isLoaded ? (
        <SafeAreaView style={styles.container} >
     {
        data.length !==0?(
        <FlashList
          estimatedItemSize={100}
          data={data}
          renderItem={renderItem}
        />
        ):<View style={styles.nodata} >
            <Text> No Doctors Found </Text>
            </View>
     }

    </SafeAreaView>
    ):
    (
        <ContentLoader/>
    )
}
    </>
  )
}

const styles=StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      nodata:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }
})

export default SearchResult