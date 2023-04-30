import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import SpaceXLogo from '../../assets/imgs/SpaceXLogo.png';
import {styles} from './Home.style';

import {
  getQueryLaunches,
  getUpcomingLaunches,
  ILaunch,
} from '../../services/services';
import {AllLaunches} from '../../components/AllLaunchesComponent/AllLaunches';
import {UpcomingLaunches} from '../../components/UpcomingLaunchesComponent/UpcomingLaunches';

import {BackHandler, Image} from 'react-native';
import {PDateQuery} from '../../components/AllLaunchesComponent/AllLaunches.props';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';

export const Home = (): JSX.Element => {
  const [upcomingLaunches, setUpcomingLaunches] = useState<ILaunch[]>([]);
  const [isUpcomingLuanches, setIsUpcomingLaunches] = useState<boolean>(false);
  const opacity = useSharedValue(1);
  const [allLaunches, setAllLaunches] = useState<ILaunch[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number | null>(null);
  const [queryA, setQuery] = useState<PDateQuery | null>(null);

  useEffect(() => {
    getMoreLaunches(page, queryA, allLaunches);
  }, [page]);

  const getMoreLaunches = async (
    pageNumber: number,
    tempQuery: PDateQuery | null,
    data: ILaunch[],
  ) => {
    await getQueryLaunches({
      query: tempQuery ? tempQuery : {},
      options: {page: pageNumber, limit: 10},
    }).then(res => {
      setAllLaunches([...data, ...res.docs]);
      setTotalDocs(res.totalDocs);
    });
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const reset = (tempQuery: PDateQuery | null) => {
    if (!tempQuery) {
      return;
    }
    setQuery(tempQuery);
    getMoreLaunches(1, tempQuery, []);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    await Promise.all([
      getQueryLaunches({
        query: {},
        options: {page: 1, limit: 10},
      }).then(res => {
        setAllLaunches(res.docs);
        setTotalDocs(res.totalDocs);
      }),
      getUpcomingLaunches().then(res => {
        setUpcomingLaunches(res);
      }),
    ]);
  };
  useEffect(() => {
    opacity.value = withTiming(1, {duration: 1000});
  }, [isUpcomingLuanches]);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      flex: 1,
    };
  });

  return (
    <View style={styles.mainContainer} useSafeArea>
      <View centerH>
        <Image style={styles.spaceXLogo} source={SpaceXLogo} />
      </View>
      <Animated.View style={reanimatedStyle}>
        {isUpcomingLuanches ? (
          <UpcomingLaunches launches={upcomingLaunches} />
        ) : (
          <AllLaunches
            setPage={setPage}
            launches={allLaunches}
            totalDocs={totalDocs}
            reset={reset}
          />
        )}
      </Animated.View>
      <Text
        style={styles.launchHeader}
        onPress={() => {
          opacity.value = withTiming(0, {duration: 1000}, () => {
            runOnJS(setIsUpcomingLaunches)(!isUpcomingLuanches);
          });
        }}
        center>
        See {isUpcomingLuanches ? 'All' : 'Upcoming'} Launches
      </Text>
    </View>
  );
};
