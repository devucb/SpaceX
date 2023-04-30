import React from 'react';
import {FlatList} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {PUpcomingLaunches} from './UpcomingLaunches.props';
import {styles} from './UpcomingLaunches.style';
import EmptyLaunch from '../../assets/imgs/EmptyLaunch.jpeg';
import {RootStackParamList} from '../../routes/RootNavigation/RootNavigation.props';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import LaunchCell from '../AllLaunchesComponent/LaunchCell';
import {CustomLinear} from '../CustomLinearComponent/CustomLinear';
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'HomePage'>;
export const UpcomingLaunches = ({launches}: PUpcomingLaunches) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View flex-1>
      <View paddingH-24 row spread>
        <Text style={styles.launchHeader}>Upcoming Launches</Text>
      </View>
      <View flex-1 marginV-16>
        <FlatList
          keyExtractor={(item, index) => item.id + index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 12}}
          renderItem={({item, index}) => (
            <LaunchCell
              index={index}
              navigate={item =>
                navigation.navigate('SpaceDetailsPage', {launch: item})
              }
              item={item}
            />
          )}
          style={styles.upcomingLaunchesList}
          data={launches}
        />
        <CustomLinear />
      </View>
    </View>
  );
};
