import React from 'react';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import RootStackScreen from './screens/RootStackScreen';

const App = () => {

  const theme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  return (
    <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}>
      <RootStackScreen/>
    </NavigationContainer>
    </PaperProvider>
  );

}

export default App;
