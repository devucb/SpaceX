import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scroll: {paddingHorizontal: 12},
  launchImage: {
    width: '100%',
    height: 200,
  },
  socialMediaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  launchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#034078',
  },

  launchValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  buttonContainer: {
    marginHorizontal: 2,
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    elevation: 2,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
