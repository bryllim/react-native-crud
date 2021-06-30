import React from 'react';
import { 
  NavigationContainer, 
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
} from 'react-native-paper';

import RootStackScreen from './screens/RootStackScreen';

const App = () => {

  const theme = {
    colors: {
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
