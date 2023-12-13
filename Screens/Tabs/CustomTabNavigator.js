import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {DOCTOR_TAB, FEED_TAB, PROFILE_TAB, SEARCH_TAB} from '../../routes';
import ActiveFeed from '../../assets/img/ACTIVE_FEED.svg';
import InactiveFeed from '../../assets/img/INACTIVE_FEED.svg';
import ActiveDoctor from '../../assets/img/ACTIVE_DOCTOR.svg';
import InActiveDoctor from '../../assets/img/INACTIVE_DOCTOR.svg';
import ActiveSearch from '../../assets/img/ACTIVE_SEARCH.svg';
import InactiveSearch from '../../assets/img/INACTIVE_SEARCH.svg';
import DoctorStack from '../Stacks/DoctorStack';
import SearchStack from '../Stacks/SearchStack';
import ProfileStack from '../Stacks/ProfileStack';
import {indexTab} from '../../Redux/Slice/indexSlice';
import {height, width} from '../../config/GlobalStyles';
import {screen} from '../../Redux/Slice/screenNameSlice';
import {useDispatch, useSelector} from 'react-redux';

const CustomTabNavigator = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(state => state.index.index);
  const screenData = [
    {
      id: 0,
      activeIcon: <ActiveFeed width={16} height={20} />,
      name: 'MAIN',
      inActiveIcon: <InactiveFeed width={16} height={20} />,
    },
    {
      id: 1,
      activeIcon: <ActiveDoctor width={20} height={20} />,
      name: 'DOC',
      inActiveIcon: <InActiveDoctor width={20} height={20} />,
    },
    {
      id: 2,
      activeIcon: <ActiveSearch width={20} height={20} />,
      name: 'SEARCH',
      inActiveIcon: <InactiveSearch width={20} height={20} />,
    },
    {
      id: 3,
      activeIcon: <ActiveFeed width={16} height={20} />,
      name: 'PROFILE',
      inActiveIcon: <InactiveFeed width={16} height={20} />,
    },
  ];
  useEffect(() => {
    // This effect will run whenever the 'active' state changes
    // Place any logic here that should run after the state has been updated
    console.log('Selected Tab:', active);
  }, [active]);

  const handleSelected = (item, index) => {
    console.log('index', index);
    console.log('item id', item.id);
    dispatch(screen(item.name));
    dispatch(indexTab(index));
  };

  return (
    <View style={styles.tabBar}>
      {screenData.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.icons]}
            onPress={() => {
              handleSelected(item, index);
            }}>
            {selectedIndex === index ? item.activeIcon : item.inActiveIcon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,

    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#fff',

    height: 60,
    flexDirection: 'row',
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',

    width: width / 4,
    height: 60,
  },
});
