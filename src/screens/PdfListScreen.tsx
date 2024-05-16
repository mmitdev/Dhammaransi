import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {Theme, useThemeContext} from '../contexts/ThemeContext';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../theme';
import {CustomButton} from '../components/utils';
import {Ionicons} from '../utils/common';
import {ebooks} from '../utils/constants';
import Container from '../components/commons/Container';

const PdfListScreen = () => {
  const {theme} = useThemeContext();
  const {width, height} = useWindowDimensions();
  const styles = styling(theme);
  return (
    <Container title="TITLES.PDFSCREEN_TITLE">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {ebooks?.map(ebook => (
          <React.Fragment key={ebook.id}>
            <View style={styles.contentContainer}>
              <View style={styles.contentContainer}>
                <View
                  style={[
                    styles.img,
                    {
                      width: width * 0.25,
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
              <CustomButton
                onPress={() => console.log('hello')}
                icon={
                  <Ionicons
                    name={`cloud-download-outline`}
                    size={30}
                    color={Colors[theme].primary}
                  />
                }
                customButtonStyle={styles.btn}
              />
            </View>
            {ebooks.length !== ebook?.id && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </Container>
  );
};

export default PdfListScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingRight: 10,
    },
    contentContainer: {
      flexDirection: 'row',
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
