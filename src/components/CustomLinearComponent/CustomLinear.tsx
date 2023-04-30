import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native-ui-lib';
import {styles} from './CustomLinear.style';

export const CustomLinear = () => {
  return (
    <>
      <View style={styles.topLinear}>
        <LinearGradient
          colors={[
            'rgba(231, 236, 239,1)',
            'rgba(231, 236, 239,0.8)',
            'rgba(231, 236, 239,0.6)',
            'rgba(231, 236, 239,0.4)',
            'rgba(231, 236, 239,0.2)',
            'rgba(231, 236, 239,0)',
          ]}
          style={styles.linear}
        />
      </View>

      <View style={styles.bottomLinear}>
        <LinearGradient
          colors={[
            'rgba(231, 236, 239,0)',
            'rgba(231, 236, 239,0.2)',
            'rgba(231, 236, 239,0.4)',
            'rgba(231, 236, 239,0.6)',
            'rgba(231, 236, 239,0.8)',
            'rgba(231, 236, 239,1)',
          ]}
          style={styles.linear}
        />
      </View>
    </>
  );
};
