import React, {memo} from 'react';
import {Image, Pressable} from 'react-native';
import {styles} from './AllLaunches.style';
import moment from 'moment';
import {Text, View} from 'react-native-ui-lib';
import {ILaunch} from '../../services/services';

const LaunchCell = ({
  item,
  index,
  navigate,
}: {
  item: ILaunch;
  index: number;
  navigate: (launch: ILaunch) => void;
}): JSX.Element => (
  <Pressable
    onPress={() => navigate(item)}
    key={item.id + index.toString()}
    style={styles.launchContainer}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.launchImage}
        resizeMode="cover"
        source={{
          uri:
            item.links.patch.small === null
              ? 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png'
              : item.links.patch.small,
        }}
      />
    </View>
    <View style={styles.launchInfoContainer}>
      <View style={styles.launchDetail}>
        <Text style={styles.launchTitle}>
          Flight Number:{' '}
          <Text style={styles.launchValue}>{item.flight_number}</Text>
        </Text>
      </View>

      <View style={styles.launchDetail}>
        <Text style={styles.launchTitle}>
          Name: <Text style={styles.launchValue}>{item.name}</Text>
        </Text>
      </View>

      {item.upcoming ? (
        <View style={styles.launchDetail}>
          <Text style={styles.launchTitle}>
            Fire Date:{' '}
            <Text style={styles.launchValue}>
              {item.static_fire_date_unix === null
                ? 'Unknown'
                : moment(item.date_unix * 1000).fromNow()}
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.launchDetail}>
          <Text style={styles.launchTitle}>
            Status:{' '}
            <Text style={styles.launchValue}>
              {item.success ? 'Success' : 'Failed'}
            </Text>
          </Text>
        </View>
      )}
    </View>
  </Pressable>
);

export default memo(LaunchCell);
