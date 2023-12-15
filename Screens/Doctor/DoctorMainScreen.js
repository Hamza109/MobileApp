import {
  View,
  Text,
  Alert,
  Pressable,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../../components/apiConfig';
import axios from 'axios';
import {docData} from '../../Redux/Slice/DoctorDetailSlice';
import {useDispatch, useSelector} from 'react-redux';
import {FontFamily, Color, width} from '../../config/GlobalStyles';
import ContentLoader from '../../components/ContentLoader';
import ScheduleButton from '../../components/ScheduleButton';
import OutButton from '../../components/outButton';
import RelatedCard from '../../components/RelatedCard';
import Right from '../../assets/img/RIGHT.svg';
import {ARTICLES_READ,DOC_CURES} from '../../routes';

const DoctorMainScreen = ({route, navigation}) => {
  const doc = useSelector(state => state.docData.doc);
  const dispatch = useDispatch();
  const id = route.params.ids;
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState();
  const [exist, setExist] = useState(false);
  const [docCures, setDocCures] = useState([]);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${id}.png`,
  );
  const firstName = route.params.firstName
  const secondName = route.params.secondName

  const checkIfImage = async imageUrl => {
    try {
      const res = await fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'});

      if (res.ok) {
        setExist(true);
      } else {
        setExist(false);
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
    }
  };
  useEffect(() => {
    console.log('doctor', doc);
    const fetchDocData = async () => {
      try {
        // Array of promises representing your API calls
        const promises = [
          fetch(
            `${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`,
          ),
          fetch(
            `${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${id}`,
          ),
        ];

        // Wait for all promises to resolve using Promise.all
        const [response1, response2] = await Promise.all(promises);

        // Assuming the API returns JSON, use .json() to parse the responses
        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log('data', data2.length);
        // Set the state with the fetched data
        setItem(data1);
        setDocCures(data2);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Don't forget to call the function
    fetchDocData();

    // Move the checkIfImage call inside the fetchDocData function
    checkIfImage(url);
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  async function getDoc() {
    try {
      const response = await fetch(
        `${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      setItem(json);
      console.log(json);
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle errors, e.g., show an error message to the user
    } finally {
      setIsLoaded(true);
    }
  }
  return (
    <>
      {isLoaded ? (
        <ScrollView style={{backgroundColor: '#fff', paddingHorizontal: 26}}>
          <View style={{backgroundColor: '#fff'}}>
            <Image
              source={{
                uri: url,
              }}
              style={{
                width: 372,
                height: 372,
                overflow: 'hidden',
                borderRadius: 5,
                padding: 10,
                marginVertical: 10,

                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{justifyContent: 'space-between'}}>
            {item.docname_first !== null && (
              <View style={[styles.positions, {flexDirection: 'column'}]}>
                <Text style={styles.mainTextTitle}>Name</Text>
                <Text style={styles.mainText}>
                  {' '}
                  Dr.{item?.docname_first} {item?.docname_last}
                </Text>
              </View>
            )}

            <View style={styles.positions}>
              {item.primary_spl !== null && (
                <View style={{flex: 1}}>
                  <Text
                    style={[styles.mainTextTitle, {alignSelf: 'flex-start'}]}>
                    Specialization
                  </Text>
                  <Text style={[styles.mainText, {alignSelf: 'flex-start'}]}>
                    {item?.primary_spl}
                  </Text>
                </View>
              )}

              {item.primary_spl !== null && (
                <View style={{flex: 1}}>
                  <Text style={[styles.mainTextTitle, {alignSelf: 'flex-end'}]}>
                    Positions
                  </Text>
                  <Text style={[styles.mainText, {alignSelf: 'flex-end'}]}>
                    Add{' '}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.positions}>
              {item.hospital_affliated !== null && (
                <View style={{flex: 1}}>
                  <Text
                    style={[styles.mainTextTitle, {alignSelf: 'flex-start'}]}>
                    Organisation
                  </Text>
                  <Text style={[styles.mainText, {alignSelf: 'flex-start'}]}>
                    {item?.hospital_affliated}
                  </Text>
                </View>
              )}
              {item.country_code !== null && (
                <View style={{flex: 1}}>
                  <Text style={[styles.mainTextTitle, {alignSelf: 'flex-end'}]}>
                    Location
                  </Text>
                  <Text style={[styles.mainText, {alignSelf: 'flex-end'}]}>
                    {item?.country_code}
                  </Text>
                </View>
              )}
            </View>
            {item.about !== null && (
              <View style={[styles.positions, {flexDirection: 'column'}]}>
                <Text style={styles.mainTextTitle}>Bio</Text>

                <Text style={[styles.mainText, {maxWidth: width}]}>
                  {item?.about}
                </Text>
              </View>
            )}
          </View>
          <View
            style={[
              styles.button,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <ScheduleButton />
            <OutButton />
          </View>
          <View style={{paddingVertical: 20}}>
            <Text style={[styles.h2_text, {color: Color.colorDarkslategray}]}>
              Articles
            </Text>
            {docCures
              .filter((item, index) => index < 2)
              .map((related, key) => {
                let imageLoc = '';
                const imgLocation = related.content_location;
                if (
                  imgLocation &&
                  imgLocation.includes('cures_articleimages')
                ) {
                  imageLoc =
                    `https://all-cures.com:444/` +
                    imgLocation.replace('json', 'png').split('/webapps/')[1];
                } else {
                  imageLoc =
                    'https://all-cures.com:444/cures_articleimages//299/default.png';
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push(ARTICLES_READ, {
                        articleId: related.article_id,
                      });
                    }}
                    activeOpacity={0.7}
                    key={`${key}-${related.articleId}`}>
                    <RelatedCard
                      author={related.authors_name}
                      title={related.title}
                      image={imageLoc}
                      published_date={related.published_date}
                    />
                  </TouchableOpacity>
                );
              })}

            {docCures.length > 2 ? (
              <TouchableOpacity style={{marginTop: 10}} onPress={()=>{navigation.navigate(DOC_CURES,{
                docId:id,
                firstName:firstName,
                secondName:secondName
              })}}>
                <Text style={styles.seeAll}>
                  See All Cures <Right />
                </Text>
              </TouchableOpacity>
            ) : null}
            <View
              style={[
                styles.button,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <ScheduleButton />
              <OutButton />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default DoctorMainScreen;
const styles = StyleSheet.create({
  positions: {
    flexDirection: 'row',

    marginVertical: 10,
  },
  mainTextTitle: {
    fontSize: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkgray,
  },
  mainText: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    marginTop: 5,
    maxWidth: width / 2,
  },
  button: {
    marginVertical: 16,
    paddingVertical: 20,
  },
  h2_text: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.appDefaultColor,
  },
});
