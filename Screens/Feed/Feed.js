import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FontFamily,
  Color,
  Border,
  Padding,
  FontSize,
} from '../../config/GlobalStyles';
import NotificationIcon from '../../assets/img/Notification.svg';
import {width, height} from '../../config/GlobalStyles';
import {FlatList} from 'react-native-gesture-handler';

const Feed = () => {
  const [selected, setSelected] = useState(1);

  const DATA = [
    {dc_id: 1, category: 'Arthritis'},
    {dc_id: 12, category: 'Blood Disorders'},
    {dc_id: 14, category: 'Bones and Joints'},
    {dc_id: 16, category: 'Brain and Nervous'},
    {dc_id: 25, category: 'Cancer'},
    {dc_id: 43, category: 'Cardiovascular'},
    {dc_id: 56, category: 'Digestive Disorders'},
    {dc_id: 73, category: 'Endocrine and metabolic Diseases'},
    {dc_id: 88, category: 'Eye Health'},
    {dc_id: 93, category: 'Foot Problems'},
    {dc_id: 95, category: 'Infection'},
    {dc_id: 97, category: 'Infectious Diseases'},
    {dc_id: 108, category: 'Injuries'},
    {dc_id: 110, category: 'Lung and Respiratory Health'},
    {dc_id: 117, category: 'Mental Health'},
    {dc_id: 131, category: 'Pain Management'},
    {dc_id: 138, category: 'Sensitive topics'},
    {dc_id: 145, category: 'Sexual Health'},
    {dc_id: 155, category: 'Skin Problems'},
    {dc_id: 163, category: 'Sleep Disorders'},
    {dc_id: 168, category: 'Urinary Disorders'},
    {dc_id: 176, category: 'Healthy Lifestyle'},
  ];

  const selectFeatured = () => {
    setSelected(null);
  };

  const selectItem = item => {
    setSelected(item.dc_id);
  };

  return (
    // feed container
    <View style={styles.feedContainer}>
      {/* header component */}

      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Read</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>

        {/*   List of categories    */}

        <ScrollView horizontal style={{padding: 5, flex: 1, marginTop: 20}}>
          <TouchableOpacity onPress={selectFeatured}>
            <Text
              style={[
                styles.featured,
                selected === null ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              Featured
            </Text>
          </TouchableOpacity>
          {DATA.map((item, index) => {
            return (
              <View key={item.dc_id}>
                <TouchableOpacity
                  onPress={() => {
                    selectItem(item);
                  }}>
                  <Text
                    style={[
                      styles.category,
                      item.dc_id === selected
                        ? styles.activeLabel
                        : styles.inactiveLabel,
                    ]}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: height * 0.17,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  category: {
    marginLeft: 11,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 12,
  },

  featured: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSilver,
    fontSize: 12,
  },

  activeLabel: {
    color: Color.colorDarkslategray,
    borderBottomWidth: 2,
    borderColor: '#5E4DB0',
  },

  inactiveLabel: {
    color: Color.colorSilver,
  },
});

export default Feed;
