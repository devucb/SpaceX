import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safe: {height: '100%', backgroundColor: '#000'},
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  logo: {height: 150, width: Dimensions.get('screen').width},
});
