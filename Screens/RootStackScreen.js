import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {HStack, VStack, Divider, useToast} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './MainTab/MainTab';
import SignInScreen from './login/SignIn';
import SplashScreen from './MainTab/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchArt from './search/SearchArticle';
import Result from './search/Result';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SearchBar from './search/SearchBar';
import CreateScreenHome from './MainTab/CreateHome';
import Disease from './Disease/Disease';
import Verify from './login/Verify';
import ProfileScreen from './MainTab/Profile';
import DocTab from './MainTab/DocTab';
import DocResult from './search/DocResult';
import SearchDoc from './search/SearchDoc';
import Settings from './Privacy/settings';
import SearchDocCity from './search/SearchDocCity';
import DocResultCity from './search/DocResultCity';
import DocProfile from './MainTab/DocProfile';
import SignUpScreen from './login/SignUp';
import Subscribe from '../components/Subscribe';
import Feedback from '../components/FeedBack';
import Forgetpass from './login/ForgetPass';
import MyCures from './MainTab/MyCures';
import HomeScreen from './MainTab/Home';
import Legal from './Privacy/legal';
import Privacy from './Privacy/privacy';
import Terms from './Privacy/terms';
import About from './Privacy/about';
import Contact from './Privacy/contact';
import EditProfile from './MainTab/UserProfile/EditProfile';
import {useSelector} from 'react-redux';
import Delete from './Privacy/delete';
import Favourites from './MainTab/UserProfile/Favourites';
import All from './mycures/All';
import Inbox from './Inbox/Inbox';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Chat from './Inbox/Chat';
import Svg, {Path, Circle} from 'react-native-svg';
import {useDispatch, useStore} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendHost} from '../components/apiConfig';
import axios from 'axios';
import Notification from '../components/Notification';
import {screenName} from './Redux/Action';
import VideoCall from './VideoCall/VideoCall';

const Stack = createStackNavigator();
const Login = createStackNavigator();
const Home = createStackNavigator();
const Doctor = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginStack = () => {
  return (
    <Login.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 60 : 90,
        },

        headerTintColor: '#00415e',
      }}>
      <Login.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Login.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Login.Screen
        name="Forgetpass"
        component={Forgetpass}
        options={{headerShown: false}}
      />

      <Login.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
    </Login.Navigator>
  );
};

const SplashStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="settings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="legal" component={Legal} />
      <Stack.Screen name="privacy" component={Privacy} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen
        name="delete"
        component={Delete}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  const Navigation = useNavigation();
  const user = useSelector(state => state.userId.regId);
  const doc = useSelector(state => state.info.data);

  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`,
  );
  const toast = useToast();
  const article = useSelector(state => state.getArtId.articleId);
  const like = useStore();
  const [isFavorite, setIsFavorite] = useState();
  const goto = () => {
    toast.show({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: 'You can access favorites in Mycures.',
      status: 'info',
      placement: 'bottom',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });

    return true;
  };

  const handleFavourite = () => {
    const favoriteValue = like ? 0 : 1;
    axios
      .post(
        `${backendHost}/favourite/userid/${user}/articleid/${article.id}/status/${favoriteValue}/create`,
      )
      .then(res => {
        if (res.data > 0) {
          dispatch(fav(favoriteValue));
          goto();
        }
      })
      .catch(err => {
        err;
        throw err;
      });
  };

  useEffect(() => {
    setUrl(
      `http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`,
    );

    checkIfImage(url);
  }, [doc.rowno]);

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }

  return (
    <Home.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 60 : 90,
        },

        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginTop: Platform.OS === 'android' ? 0 : 50,
        },
      }}>
      <Home.Screen
        name="Main"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false,gestureEnabled:false}}
      />
      <Stack.Screen
        name="Forgetpass"
        component={Forgetpass}
        options={{headerShown: false}}
      /> */}

      <Home.Screen
        name="CreateScreenHome"
        component={CreateScreenHome}
        options={{
          headerTitle: 'Create Article',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                Navigation.dispatch(StackActions.pop(1));
              }}
            />
          ),
        }}
      />
      <Home.Screen
        name="Result"
        component={Result}
        options={{headerShown: false, headerLeft: null}}
      />

      <Home.Screen
        name="Disease"
        component={Disease}
        options={({route}) => {
          return {
            title: article.title,
            headerLeft: () => (
              <IonIcon
                name="chevron-back-outline"
                style={{
                  marginLeft: 10,
                  marginTop: Platform.OS === 'android' ? 0 : 45,
                }}
                color={'#00415e'}
                size={28}
                onPress={() => {
                  Navigation.goBack();
                }}
              />
            ),

            gestureEnabled: false,
          };
        }}
      />
      <Home.Screen name="Subscribe" component={Subscribe} />
      <Home.Screen name="Feedback" component={Feedback} />
      <Home.Screen
        name="searchArt"
        component={SearchArt}
        options={{headerShown: false}}
      />

      <Home.Screen
        name="SearchBar"
        component={SearchBar}
        options={{headerShown: false}}
      />

      <Home.Screen
        name="DocProfile"
        component={DocProfile}
        options={{
          headerTitle: 'Doctor Finder',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                Navigation.dispatch(StackActions.pop(1));
              }}
            />
          ),
        }}
      />
      <Home.Screen
        name="videoCall"
        component={VideoCall}
        options={{headerShown: 'false', title: 'Video Call'}}
      />

      <Home.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
            backgroundColor: '#00415e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            marginTop: Platform.OS === 'android' ? 0 : 50,
          },
          headerTitle: `Dr. ${doc.docname_first} ${doc.docname_last}`,
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: Platform.OS === 'android' ? 5 : 45,
              }}>
              <IonIcon
                name="chevron-back-outline"
                style={{marginLeft: 10}}
                color={'#fff'}
                size={28}
                onPress={() => {
                  Navigation.dispatch(StackActions.pop(1));
                }}
              />
              {exist ? (
                <Image
                  source={{uri: url}}
                  style={{width: 40, height: 40, borderRadius: 25}}
                />
              ) : (
                <User />
              )}
            </View>
          ),
        }}
      />
      <Home.Screen
        name="Forgetpass"
        component={Forgetpass}
        presentation={'modal'}
        options={{headerShown: false}}
      />
    </Home.Navigator>
  );
};

const DocStack = () => {
  const navigation = useNavigation();
  const doc = useSelector(state => state.info.data);
  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`,
  );
  const user = useSelector(state => state.userId.regId);

  const toast = useToast();
  const article = useSelector(state => state.getArtId.articleId);
  const [isFavorite, setIsFavorite] = useState();
  const goto = () => {
    toast.show({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: 'You can access favorites in Mycures.',
      status: 'info',
      placement: 'bottom',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });

    return true;
  };

  const handleFavourite = () => {
    const favoriteValue = isFavorite ? 0 : 1;
    axios
      .post(
        `${backendHost}/favourite/userid/${user}/articleid/${article.id}/status/${favoriteValue}/create`,
      )
      .then(res => {
        if (res.data > 0) {
          setIsFavorite(!isFavorite);
          goto();
        }
      })
      .catch(err => {
        err;
        throw err;
      });
  };

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      // load the favorite status from storage

      // load the favorite status from the API
      const response = await fetch(
        `${backendHost}/favourite/userid/${user}/articleid/${article.id}/favourite`,
      );
      const data = await response.json();

      dispatch(fav(res.data[0].status));
      setIsFavorite(data[0].status);
      // save the favorite status to storage
    };
    loadFavoriteStatus();
  }, []);

  useEffect(() => {
    setUrl(
      `http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`,
    );

    checkIfImage(url);
  }, [doc.rowno]);

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }
  return (
    <Doctor.Navigator
      initialRouteName="DocTab"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 60 : 90,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          marginTop: Platform.OS === 'android' ? 0 : 50,
        },
      }}>
      <Doctor.Screen
        name="DocTab"
        component={DocTab}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#00415e',
            height: Platform.OS === 'android' ? 60 : 90,
          },

          headerTitle: 'Doctor',
          headerTintColor: '#fff',
          headerLeft: () => (
            <Icon
              name="user-md"
              size={30}
              style={{
                marginLeft: 20,
                color: '#fff',
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />

      <Doctor.Screen
        name="docResult"
        component={DocResult}
        options={{headerShown: false}}
      />
      <Doctor.Screen
        name="docResultCity"
        component={DocResultCity}
        options={{headerShown: false}}
      />
      <Doctor.Screen
        name="SearchBar"
        component={SearchBar}
        options={{headerShown: false}}
      />

      <Doctor.Screen
        name="SearchDocCity"
        component={SearchDocCity}
        options={{
          headerShown: true,
          headerTitle: 'Doctor Finder',
          headerTintColor: '#00415e',

          headerLeft: () => (
            <Icon
              name="user-md"
              size={30}
              style={{
                marginLeft: 20,
                color: '#00415e',
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />
      <Doctor.Screen
        name="DocProfile"
        component={DocProfile}
        options={{
          headerShown: true,
          headerTintColor: '#00415e',
          headerTitle: 'Doctor Finder',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                navigation.dispatch(StackActions.pop(1));
              }}
            />
          ),
        }}
      />

      <Doctor.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
            backgroundColor: '#00415e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            marginTop: Platform.OS === 'android' ? 0 : 45,
          },
          title: `Dr. `,
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: Platform.OS === 'android' ? 5 : 45,
              }}>
              <IonIcon
                name="chevron-back-outline"
                style={{marginLeft: 10}}
                color={'#fff'}
                size={28}
                onPress={() => {
                  navigation.dispatch(StackActions.pop(1));
                }}
              />
              {exist ? (
                <Image
                  source={{uri: url}}
                  style={{width: 40, height: 40, borderRadius: 25}}
                />
              ) : (
                <User />
              )}
            </View>
          ),
        }}
      />

      <Doctor.Screen
        name="SearchDoc"
        component={SearchDoc}
        options={{
          headerShown: true,
          headerTitle: 'Doctor Finder',
          headerTintColor: '#00415e',
          headerLeft: () => (
            <Icon
              name="user-md"
              size={30}
              style={{
                marginLeft: 20,
                color: '#00415e',
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              backgroundColor="#fff"></Icon>
          ),
        }}
      />
      <Doctor.Screen name="videoCall" component={VideoCall} />
      <Doctor.Screen
        name="Disease"
        component={Disease}
        options={({route}) => {
          return {
            title: article.title,
            headerShown: true,
            headerTintColor: '#00415e',
            headerLeft: () => (
              <IonIcon
                name="chevron-back-outline"
                style={{
                  marginLeft: 10,
                  marginTop: Platform.OS === 'android' ? 0 : 45,
                }}
                color={'#00415e'}
                size={28}
                onPress={() => {
                  navigation.dispatch(StackActions.pop(1));
                }}
              />
            ),

            gestureEnabled: false,
          };
        }}
      />
    </Doctor.Navigator>
  );
};

const ProfileStack = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.userId.regId);
  const doc = useSelector(state => state.info.data);
  const row = useSelector(state => state.docRow.rowId);
  const chatInfo = useSelector(state => state.chatUser.chat);
  const [exist, setExist] = useState(false);
  const [url, setUrl] = useState(
    `http://all-cures.com:8080/cures_articleimages/doctors/${doc.rowno}.png`,
  );

  const toast = useToast();
  const article = useSelector(state => state.getArtId.articleId);
  const [isFavorite, setIsFavorite] = useState();
  const goto = () => {
    toast.show({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: 'You can access favorites in Mycures.',
      status: 'info',
      placement: 'bottom',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });

    return true;
  };

  const handleFavourite = () => {
    const favoriteValue = isFavorite ? 0 : 1;
    axios
      .post(
        `${backendHost}/favourite/userid/${user}/articleid/${article.id}/status/${favoriteValue}/create`,
      )
      .then(res => {
        if (res.data > 0) {
          setIsFavorite(!isFavorite);
          goto();
        }
      })
      .catch(err => {
        err;
        throw err;
      });
  };

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      // load the favorite status from storage

      // load the favorite status from the API
      const response = await fetch(
        `${backendHost}/favourite/userid/${user}/articleid/${article.id}/favourite`,
      );
      const data = await response.json();

      dispatch(fav(res.data[0].status));
      setIsFavorite(data[0].status);
      // save the favorite status to storage
    };
    loadFavoriteStatus();
  }, []);

  useEffect(() => {
    setUrl(
      `http://all-cures.com:8080/cures_articleimages/doctors/${chatInfo.rowno}.png`,
    );

    checkIfImage(url);
  }, [doc.rowno]);

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 60 : 90,
        },

        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginTop: Platform.OS === 'android' ? 0 : 50,
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
            backgroundColor: '#00415e',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <Icon
              style={{
                marginLeft: 20,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              name="heartbeat"
              color={'#fff'}
              size={26}
            />
          ),
        }}
      />
      <Stack.Screen
        name="favourite"
        component={Favourites}
        options={{
          title: 'Favourite Articles',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                navigation.dispatch(StackActions.pop(1));
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="cures"
        component={All}
        options={{
          title: 'My Cures',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                navigation.dispatch(StackActions.pop(1));
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="inbox"
        component={Inbox}
        options={{
          title: 'Inbox',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
            backgroundColor: '#00415e',
          },
          headerLeft: () => (
            <IonIcon
              name="mail"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 45,
              }}
              color={'#fff'}
              size={28}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Disease"
        component={Disease}
        options={({route}) => {
          return {
            title: article.title,
            headerLeft: () => (
              <IonIcon
                name="chevron-back-outline"
                style={{
                  marginLeft: 10,
                  marginTop: Platform.OS === 'android' ? 0 : 45,
                }}
                color={'#00415e'}
                size={28}
                onPress={() => {
                  navigation.dispatch(StackActions.pop(1));
                }}
              />
            ),

            gestureEnabled: false,
          };
        }}
      />

      <Stack.Screen
        name="chat"
        component={Chat}
        options={({route}) => ({
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            height: Platform.OS === 'android' ? 60 : 90,
            backgroundColor: '#00415e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            marginTop: Platform.OS === 'android' ? 0 : 50,
          },

          headerTitle: () =>
            row == 0 ? (
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: Platform.OS === 'android' ? 5 : 45,
                }}>
                Dr. {route.params.first_name} {route.params.last_name}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: Platform.OS === 'android' ? 5 : 45,
                }}>
                {chatInfo.first_name} {chatInfo.last_name}
              </Text>
            ),
          headerLeft: ({route}) =>
            chatInfo.rowno != null ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Platform.OS === 'android' ? 5 : 45,
                }}>
                <IonIcon
                  name="chevron-back-outline"
                  style={{marginLeft: 10}}
                  color={'#fff'}
                  size={28}
                  onPress={() => {
                    navigation.dispatch(StackActions.pop(1));
                  }}
                />
                {exist ? (
                  <Image
                    source={{uri: url}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                      marginTop: Platform.OS === 'android' ? 5 : 45,
                    }}
                  />
                ) : (
                  <User />
                )}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Platform.OS === 'android' ? 5 : 45,
                }}>
                <IonIcon
                  name="chevron-back-outline"
                  style={{marginLeft: 10}}
                  color={'#fff'}
                  size={28}
                  onPress={() => {
                    navigation.dispatch(StackActions.pop(1));
                  }}
                />
                <User />
              </View>
            ),
        })}
      />
      <Stack.Screen
        name="editprofile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
          headerLeft: () => (
            <IonIcon
              name="chevron-back-outline"
              style={{
                marginLeft: 10,
                marginTop: Platform.OS === 'android' ? 0 : 30,
              }}
              color={'#00415e'}
              size={28}
              onPress={() => {
                navigation.push('profile');
              }}
            />
          ),
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};
const CuresStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyCures"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 60 : 90,
        },
        headerTintColor: '#00415e',
        headerTitleStyle: {
          fontWeight: 'bold',
          marginTop: Platform.OS === 'android' ? 0 : 30,
        },
      }}>
      <Stack.Screen
        name="MyCures"
        component={MyCures}
        options={{
          headerTitle: 'My Cures',
          headerLeft: () => (
            <Icon
              name="heartbeat"
              size={30}
              style={{
                marginLeft: 20,
                color: '#00415e',
                marginTop: Platform.OS === 'android' ? 0 : 30,
              }}
              backgroundColor="#fff"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="videoCall" component={VideoCall} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const user = useSelector(state => state.userId.regId);
  const dispatch = useDispatch();

  const check = () => {
    if (user != 0) {
      Navigation.navigate('ProfileTab', {screen: 'inbox'});
    } else {
      dispatch(screenName('LOGIN'));
    }
  };

  const Navigation = useNavigation();

  useEffect(() => {}, []);
  const remove = async () => {
    dispatch(reg(0));
  };
  const logout = () => {
    Alert.alert('Hold on!', 'Are you sure you want Logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          dispatch(screenName('SPLASH')), remove();
        },
      },
    ]);
    return true;
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        {...props}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={{backgroundColor: '#fff'}}>
            <HStack ml="3" mb="3" mt="3" bg="#fff" space={1}>
              <Image
                resizeMode="stretch"
                source={require('../assets/img/heart.png')}
                style={styles.imageModal}></Image>
              <Text
                style={{
                  marginTop: 22,
                  marginRight: 15,
                  fontSize: 20,
                  color: '#00415e',
                }}>
                All Cures
              </Text>
            </HStack>
          </View>

          <DrawerItem
            icon={() => <IonIcon name="mail" size={22} color="#00415e" />}
            label="Inbox"
            labelStyle={{
              color: '#00415e',
              fontFamily: 'Raleway-Medium',
              position: 'relative',
              right: 4,
              fontSize: 16,
            }}
            onPress={check}
          />
          <Divider style={{marginBottom: 10}} />
          <DrawerItemList {...props} />

          <View></View>
          <View></View>
        </SafeAreaView>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        height: Platform.OS === 'android' ? 60 : 90,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MainTabScreen}
        options={{
          headerShown: null,

          drawerLabel: 'Home',
          drawerLabelStyle: {
            color: '#00415e',
            fontFamily: 'Raleway-Medium',
            position: 'relative',
            right: 5,
          },
          drawerIcon: () => <Icon name="home" color={'#00415e'} size={22} />,
        }}
      />

      <Drawer.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'Subscribe',
          drawerLabelStyle: {
            color: '#00415e',
            fontFamily: 'Raleway-Medium',
            position: 'relative',
            right: 4,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                name="bars"
                size={25}
                color="#00415e"
                style={{
                  marginTop: Platform.OS === 'android' ? 0 : 0,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),

          drawerIcon: ({focused, size}) => (
            <Icon
              name="bell"
              color={'#00415e'}
              size={22}
              style={{marginLeft: -2}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#fff',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'Notification',
          drawerLabelStyle: {
            color: '#00415e',
            fontFamily: 'Raleway-Medium',
            position: 'relative',
            right: 4,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                name="bars"
                size={25}
                color="#00415e"
                style={{
                  marginTop: Platform.OS === 'android' ? 0 : 0,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          drawerIcon: ({focused, size}) => (
            <IonIcon
              name="bulb"
              color={'#00415e'}
              size={22}
              style={{marginLeft: -2}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'Feedback',
          drawerLabelStyle: {
            color: '#00415e',
            fontFamily: 'Raleway-Medium',
            position: 'relative',
            right: 4,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                name="bars"
                size={25}
                color="#00415e"
                style={{
                  marginTop: Platform.OS === 'android' ? 0 : 0,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          drawerIcon: ({focused, size}) => (
            <Icon
              name="paper-plane"
              color={'#00415e'}
              size={22}
              style={{marginLeft: -2}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingStack}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
            height: Platform.OS === 'android' ? 60 : 90,
          },
          headerTintColor: '#00415e',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'Settings',
          drawerLabelStyle: {
            color: '#00415e',
            fontFamily: 'Raleway-Medium',
            position: 'relative',
            right: 4,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                name="bars"
                size={25}
                color="#00415e"
                style={{
                  marginTop: Platform.OS === 'android' ? 0 : 0,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          drawerIcon: () => (
            <IonIcon
              name="md-settings"
              color={'#00415e'}
              size={22}
              style={{marginLeft: -2}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 0,
    height: hp('60%'),
    width: wp('100%'),
    position: 'relative',
    bottom: 90,
    borderRadius: 0,
    backgroundColor: '#00415e',
  },

  search: {
    position: 'relative',
    bottom: 282,
    backgroundColor: '#fff',
  },

  b1: {
    backgroundColor: '#00415e',
    padding: 40,
  },

  text: {
    backgroundColor: '#00415e',
    color: '#fff',
    textAlign: 'center',
  },
  h1: {
    position: 'relative',
    bottom: 450,
    right: 0,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  t2: {
    position: 'relative',
    bottom: 410,

    padding: 10,
    margin: 0,
    zIndex: 9999,
  },
  centeredView: {
    flex: 1,

    marginTop: 25,
  },
  modalView: {
    alignItems: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    padding: 20,
    marginTop: 5,
    height: hp('5%'),
    width: wp('5%'),
  },
  imageModal: {
    padding: 20,
    height: 60,
    width: wp('15%'),
  },
  btn: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#00415e',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    height: hp('4.5%'),
    backgroundColor: '#00415e',
    color: 'white',
    marginRight: 10,
    marginTop: 12,
  },
  inbox: {
    flexDirection: 'row',
    marginLeft: 15,
  },
});

const Navigator = () => {
  const navigation = useSelector(state => state.name.screen);
  switch (navigation) {
    case 'LOGIN':
      return <LoginStack />;
    case 'MAIN':
      return <DrawerNavigator />;
    case 'SPLASH':
      return <SplashStack />;
    default:
      return <DrawerNavigator />;
  }
};

export {
  DocStack,
  SplashStack,
  CuresStack,
  SettingStack,
  ProfileStack,
  LoginStack,
  Navigator,
  HomeStack,
};
