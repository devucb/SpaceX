import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '../../screens/HomePage/Home';
import {SpaceDetails} from '../../screens/SpaceDetailsPage/SpaceDetails';
import {Splash} from '../../screens/SplashPage/Splash';
import React, {useRef} from 'react';
import {StatusBar} from 'react-native';
import {RootStackParamList} from './RootNavigation.props';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation(): JSX.Element {
  const navigationRef = useRef(null);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
          headerTitleAlign: 'center',
          headerTransparent: true,
        }}>
        <Stack.Screen name="SplashPage" component={Splash} />
        <Stack.Screen
          options={{gestureEnabled: false}}
          name="HomePage"
          component={Home}
        />
        <Stack.Screen name="SpaceDetailsPage" component={SpaceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
