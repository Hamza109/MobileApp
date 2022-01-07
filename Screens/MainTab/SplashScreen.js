import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { max } from 'react-native-reanimated';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#00415e' barStyle="light-content"/>
        <View style={styles.header}>
            <ImageBackground
            source={require('../../assets/img/LandingMainImg.jpg')} resizeMode='cover'style={styles.image}   >
                </ImageBackground>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/img/heart.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={styles.head}>All Cures</Text>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('MainTab')}>
                <LinearGradient
                    colors={['#00415e', '#00415e']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00415e'
  },
  head:{
    position:'relative',
    bottom: 430,
    left: 120,
    fontSize: 25,
    fontWeight: 'bold'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      position:'relative',
      bottom: 400,
      left: 40
  },
  title: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
     
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  image: {
position: 'relative',
top:150,
right:120,
    width: 700, 
    height: 580
  }
});

