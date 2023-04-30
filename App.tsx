/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigation from './src/routes/RootNavigation/RootNavigation';
import {ErrorModal} from './src/components/ErrorModalComponent/ErrorModal';
import {LoadingModal} from './src/components/LoadingModalComponent/LoadingModal';

enableScreens(false);

const App: React.FC<Record<string, unknown>> = () => {
  return (
    <SafeAreaProvider>
      <RootNavigation />
      <LoadingModal />
      <ErrorModal />
    </SafeAreaProvider>
  );
};

export default App;
