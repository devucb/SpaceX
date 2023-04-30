import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: Dimensions.get('screen').width * 0.7,
  },
});
