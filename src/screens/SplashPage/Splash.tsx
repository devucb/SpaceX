import {View} from 'react-native-ui-lib';
import {View as MotiView} from 'moti';
import Logo from '../../assets/imgs/SpaceXLogo.png';
import React, {useEffect} from 'react';
import {styles} from './Splash.style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

import {RootStackParamList} from '../../routes/RootNavigation/RootNavigation.props';
type SplashScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'SplashPage'
>;

export const Splash = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        navigation.navigate('HomePage');
      }, 3000);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View useSafeArea style={styles.safe}>
      <View style={styles.mainContainer}>
        <MotiView
          from={{
            scale: 1,
          }}
          animate={{
            scale: 1.2,
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 1000,
          }}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </MotiView>
      </View>
    </View>
  );
};
