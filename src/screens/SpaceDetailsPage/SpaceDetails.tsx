import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {styles} from './SpaceDetails.style';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/RootNavigation/RootNavigation.props';

import {
  Alert,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ILaunch} from '../../services/services';
import moment from 'moment';
import {Icon} from '../../components/IconComponent/Icon';

type SpaceDetailsScreenProp = RouteProp<RootStackParamList, 'SpaceDetailsPage'>;

export const SpaceDetails = (): JSX.Element => {
  const route = useRoute<SpaceDetailsScreenProp>();
  const launch: ILaunch = route.params.launch;

  return (
    <View flex-1 useSafeArea>
      <Image
        resizeMode="contain"
        source={{
          uri:
            launch.links.patch.small === null
              ? 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png'
              : launch.links.patch.small,
        }}
        style={styles.launchImage}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scroll}>
        <View style={styles.socialMediaContainer}>
          {launch.links.article && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                Linking.openURL(launch.links.article).catch(() =>
                  Alert.alert('Error', 'Could not open article'),
                );
              }}>
              <Icon size="medium" color="black" name="newspaper" />
            </TouchableOpacity>
          )}
          {launch.links.wikipedia && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                Linking.openURL(launch.links.wikipedia).catch(() =>
                  Alert.alert('Error', 'Could not open wikipedia'),
                );
              }}>
              <Icon size="medium" color="black" name="wikipedia" />
            </TouchableOpacity>
          )}

          {launch.links.webcast && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                Linking.openURL(launch.links.webcast).catch(() =>
                  Alert.alert('Error', 'Could not open stream'),
                );
              }}>
              <Icon size="medium" color="red" name="youtube" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.launchTitle}>
          Flight Number:{' '}
          <Text style={styles.launchValue}>{launch.flight_number}</Text>
        </Text>

        <Text style={styles.launchTitle}>
          Name: <Text style={styles.launchValue}>{launch.name}</Text>
        </Text>

        <Text style={styles.launchTitle}>
          Id: <Text style={styles.launchValue}>{launch.id}</Text>
        </Text>

        <Text style={styles.launchTitle}>
          Status:{' '}
          <Text style={styles.launchValue}>
            {launch.upcoming !== null
              ? launch.upcoming
                ? 'Upcoming'
                : launch.success
                ? 'Success'
                : 'Failed'
              : 'Unknown'}
          </Text>
        </Text>

        {launch.static_fire_date_unix ? (
          <Text style={styles.launchTitle}>
            Fire Date:{' '}
            <Text style={styles.launchValue}>
              {moment(launch.static_fire_date_unix * 1000).fromNow()}
            </Text>
          </Text>
        ) : (
          <Text style={styles.launchTitle}>
            Fire Date: <Text style={styles.launchValue}>Unknown</Text>
          </Text>
        )}
        {launch.details !== null && (
          <Text style={styles.launchTitle}>
            Details: <Text style={styles.launchValue}>{launch.details}</Text>
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
