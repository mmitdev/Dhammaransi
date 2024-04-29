import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme, useThemeContext} from '../contexts/ThemeContext';
import {Colors} from '../theme';
import Slider from '@react-native-community/slider';
import {CustomButton} from '../components/utils';
import {Entypo, MaterialIcon} from '../utils/common';

const TrackScreen = () => {
  const insets = useSafeAreaInsets();
  const {theme} = useThemeContext();
  const {width, height} = useWindowDimensions();
  const [repeatMode, setRepeatMode] = useState('off');
  const [isPlay, setIsPlayed] = useState('controller-play');

  const styles = styling(theme);
  const {top, bottom, left, right} = insets;

  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }
    if (repeatMode === 'track') {
      return 'repeat-once';
    }
    if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode === 'off') {
      setRepeatMode('track');
    }
    if (repeatMode === 'track') {
      setRepeatMode('repeat');
    }
    if (repeatMode === 'repeat') {
      setRepeatMode('off');
    }
  };

  const changePlayMode = () => {
    if (isPlay === 'controller-play') {
      setIsPlayed('controller-paus');
    }
    if (isPlay === 'controller-paus') {
      setIsPlayed('controller-play');
    }
  };

  const handePlayIcon = () => {
    if (isPlay === 'controller-play') {
      return 'controller-play';
    }
    if (isPlay === 'controller-paus') {
      return 'controller-paus';
    }
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={Colors[theme].secondary} />
      <SafeAreaView style={{flex: 1.3, paddingTop: top}}>
        <View style={styles.imgContainer}>
          <View style={styles.imageShadow}>
            <Image
              source={require('../assets/marguerite.jpg')}
              resizeMode="cover"
              style={styles.img}
            />
          </View>
          <Text style={styles.titleText}>Title</Text>
          <Text style={styles.artistText}>hello</Text>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        {/* scroll bar  */}
        <View style={styles.trackContainer}>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={Colors[theme].primary_dark}
            maximumTrackTintColor={Colors[theme].text}
          />
          <View style={styles.trackDuration}>
            <Text style={styles.durationText}>0:00</Text>
            <Text style={styles.durationText}>0:00</Text>
          </View>
        </View>
        {/* play button  */}
        <View style={styles.buttonContainer}>
          <CustomButton
            customButtonStyle={styles.btn}
            icon={
              <MaterialIcon
                name={`${repeatIcon()}`}
                size={30}
                color={Colors[theme].text}
              />
            }
            onPress={changeRepeatMode}
          />
          <CustomButton
            customButtonStyle={styles.btn}
            icon={
              <Entypo
                name={`controller-jump-to-start`}
                size={45}
                color={Colors[theme].text}
              />
            }
          />
          <CustomButton
            customButtonStyle={styles.btn}
            onPress={changePlayMode}
            icon={
              <Entypo
                name={`${handePlayIcon()}`}
                size={70}
                color={Colors[theme].text}
              />
            }
          />
          <CustomButton
            customButtonStyle={styles.btn}
            icon={
              <Entypo
                name={`controller-next`}
                size={45}
                color={Colors[theme].text}
              />
            }
          />
          <CustomButton
            customButtonStyle={styles.btn}
            icon={
              <MaterialIcon
                name={`playlist-music`}
                size={30}
                color={Colors[theme].text}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default TrackScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors[theme].secondary,
    },
    imgContainer: {
      alignItems: 'center',
      gap: 10,
      paddingVertical: 20,
    },
    imageShadow: {
      width: '80%',
      height: '80%',
      borderRadius: 20,
      shadowColor: Colors[theme].text,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        android: {
          elevation: 7,
        },
      }),
    },
    img: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors[theme].text,
    },
    artistText: {
      fontSize: 18,
      color: Colors[theme].text,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
    },
    trackContainer: {
      paddingHorizontal: '10%',
      width: '100%',
      height: 100,
    },
    trackDuration: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '4%',
    },
    durationText: {
      color: Colors[theme].text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    btn: {
      backgroundColor: Colors[theme].secondary,
    },
    buttonContainer: {
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
  });
