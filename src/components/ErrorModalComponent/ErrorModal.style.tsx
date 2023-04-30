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
  serviceErrorTitle: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  tooltip: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 160,
    width: Dimensions.get('screen').width * 0.8,
  },
  closeButton: {
    backgroundColor: 'red',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  closeButtonText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
});
