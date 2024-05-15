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
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme, useThemeContext} from '../contexts/ThemeContext';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../theme';
import {CustomButton} from '../components/utils';
import {Ionicons} from '../utils/common';
import {ebooks} from '../utils/constants';
import {useTranslation} from 'react-i18next';

const PaintingsScreen = () => {
  const {theme} = useThemeContext();
  const {width, height} = useWindowDimensions();
  const {t} = useTranslation();
  const inset = useSafeAreaInsets();
  const {top} = inset;
  const styles = styling(theme);
  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <SafeAreaView>
        <Text style={[{marginTop: top}, styles.headerText]}>
          {t('PDFSCREEN_TITLE')}
        </Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {ebooks?.map(ebook => (
          <React.Fragment key={ebook.id}>
            <View style={styles.contentContainer}>
              <View style={styles.contentContainer}>
                <View
                  style={[
                    styles.img,
                    {
                      width: width * 0.9,
                      height: height * 0.16,
                    },
                  ]}>
                  <Image
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    source={{uri: ebook.image}}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.text}>{ebook.title}</Text>
              </View>
            </View>
            {ebooks.length !== ebook?.id && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default PaintingsScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors[theme].secondary,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors[theme].text,
      textAlign: 'center',
      marginBottom: 10,
    },
    container: {
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 30,
      paddingBottom: 63,
    },
    contentContainer: {
      // flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    text: {
      fontWeight: 'bold',
      color: Colors[theme].text,
      fontSize: 18,
    },
    img: {
      borderRadius: 100,
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
          elevation: 4,
        },
      }),
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: Colors[theme].secondary_dark,
      marginVertical: 20,
    },
    btn: {},
  });
