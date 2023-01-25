import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  RefreshControl,
  BackHandler,
  Animated,
} from 'react-native';
import { useToast, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { screenName } from '../Redux/Action'

const DocUser = () => {
  return (
    <View><Text>doc user</Text></View>
  )
}

export default DocUser