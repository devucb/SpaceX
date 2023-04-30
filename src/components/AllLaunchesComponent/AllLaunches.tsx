import React, {useState} from 'react';
import {FlatList, Platform, Pressable, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {PAllLaunches, PDateQuery} from './AllLaunches.props';
import {styles} from './AllLaunches.style';
import {RootStackParamList} from '../../routes/RootNavigation/RootNavigation.props';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import LaunchCell from './LaunchCell';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Icon} from '../IconComponent/Icon';
import {CustomLinear} from '../CustomLinearComponent/CustomLinear';
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'HomePage'>;

export const AllLaunches = ({
  launches,
  totalDocs,
  setPage,
  reset,
}: PAllLaunches): JSX.Element => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const height = useSharedValue(0);
  const [queryObject, setQueryObject] = useState<PDateQuery | null>({
    date_utc: {
      $lte: new Date().toISOString(),
      $gte: new Date().toISOString(),
    },
  });

  const animatedDateArea = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'scroll',
    };
  });

  const [dateFrom, setDateFrom] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [dateTo, setDateTo] = useState<boolean>(false);
  const getLaunches = (): void => {
    if (totalDocs && launches.length >= totalDocs) {
      return;
    }

    setPage(Math.round(launches.length / 10) + 1);
  };

  return (
    <View flex-1>
      <View paddingH-24 row spread>
        <Text style={styles.launchHeader}>All Launches</Text>
        <Pressable
          style={styles.getLaunchesButton}
          onPress={() => {
            if (!toggle) {
              height.value = withTiming(160, {duration: 500}, () =>
                runOnJS(setToggle)(true),
              );
              return;
            }
            height.value = withTiming(0, {duration: 500}, () =>
              runOnJS(setToggle)(false),
            );
          }}>
          <Text style={styles.launchHeader}>Filter</Text>
          <Icon name="filter" size={'small'} color="#219ebc" />
        </Pressable>
      </View>
      <Animated.View style={animatedDateArea}>
        <View style={styles.labelContainer}>
          <View style={styles.dateItemsContainer}>
            <TouchableOpacity
              style={styles.dateItemContainer}
              onPress={() => {
                if (dateTo) {
                  setDateTo(false);
                }
                setDateFrom(true);
              }}>
              <Text style={styles.dateLabel}>From: </Text>
              <View centerV row>
                <Icon name="calendar" size={'medium'} color="#8ecae6" />
                <Text style={styles.dateValueText}>
                  {queryObject && queryObject.date_utc.$gte
                    ? new Date(queryObject.date_utc.$gte).toDateString()
                    : new Date().toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (dateFrom) {
                  setDateFrom(false);
                }
                setDateTo(true);
              }}
              style={styles.dateItemContainer}>
              <Text style={styles.dateLabel}>To: </Text>
              <View centerV row>
                <Icon name="calendar" size={'medium'} color="#8ecae6" />
                <Text style={styles.dateValueText}>
                  {queryObject && queryObject.date_utc.$lte
                    ? new Date(queryObject.date_utc.$lte).toDateString()
                    : new Date().toDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View marginT-20 centerH>
          <Pressable
            style={styles.searchButton}
            onPress={() => {
              height.value = withTiming(0, {duration: 500});
              reset(queryObject);
            }}>
            <Text style={styles.searchText}>Search</Text>
            <Icon size="medium" name="search-web" color="#fff" />
          </Pressable>
        </View>
      </Animated.View>
      <View flex-1 marginV-16>
        <View marginT-10 flex-1>
          <FlatList
            keyExtractor={(item, index) => item.id + index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            renderItem={({item, index}) => (
              <LaunchCell
                index={index}
                navigate={launch =>
                  navigation.navigate('SpaceDetailsPage', {launch})
                }
                item={item}
              />
            )}
            onEndReached={getLaunches}
            onEndReachedThreshold={0.4}
            style={styles.upcomingLaunchesList}
            data={launches}
          />
          <CustomLinear />
        </View>
      </View>

      <View style={styles.bottomModal}>
        {dateFrom && (
          <RNDateTimePicker
            style={styles.datePicker}
            accentColor="#8ecae6"
            value={
              queryObject && queryObject.date_utc.$gte
                ? new Date(queryObject.date_utc.$gte)
                : new Date()
            }
            mode={'date'}
            display="spinner"
            onChange={(_event, selectedDate) => {
              if (Platform.OS === 'android') {
                setDateFrom(false);
              }
              const currentDate = selectedDate;
              setQueryObject({
                date_utc: {
                  $lte: queryObject ? queryObject.date_utc.$lte : '',
                  $gte: currentDate?.toISOString() || '',
                },
              });
            }}
          />
        )}
        {dateTo && (
          <RNDateTimePicker
            style={styles.datePicker}
            accentColor="#8ecae6"
            value={
              queryObject && queryObject.date_utc.$lte
                ? new Date(queryObject.date_utc.$lte)
                : new Date()
            }
            mode={'date'}
            display="spinner"
            onChange={(_event, selectedDate) => {
              if (Platform.OS === 'android') {
                setDateTo(false);
              }
              const currentDate = selectedDate;
              setQueryObject({
                date_utc: {
                  $lte: currentDate?.toISOString() || '',
                  $gte: queryObject ? queryObject.date_utc.$gte : '',
                },
              });
            }}
          />
        )}
        {(dateTo || dateFrom) && (
          <>
            <Pressable
              onPress={() => {
                setDateFrom(false);
                setDateTo(false);
              }}
              style={styles.filterIconContainer}>
              <Icon size="large" color="#8ecae6" name="check" />
            </Pressable>
            <Pressable
              onPress={() => {
                setDateFrom(false);
                setDateTo(false);
              }}
              style={styles.closeIconContainer}>
              <Icon size="large" color="#000" name="close" />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
