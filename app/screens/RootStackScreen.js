import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import CompanyScreen from './CompanyScreen';
import NewCompanyScreen from './NewCompanyScreen';
import EditCompanyScreen from './EditCompanyScreen';

import EmployeeScreen from './EmployeeScreen';
import NewEmployeeScreen from './NewEmployeeScreen';
import EditEmployeeScreen from './EditEmployeeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>

        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>

        <RootStack.Screen name="CompanyScreen" component={CompanyScreen}/>
        <RootStack.Screen name="NewCompanyScreen" component={NewCompanyScreen}/>
        <RootStack.Screen name="EditCompanyScreen" component={EditCompanyScreen}/>

        <RootStack.Screen name="EmployeeScreen" component={EmployeeScreen}/>
        <RootStack.Screen name="NewEmployeeScreen" component={NewEmployeeScreen}/>
        <RootStack.Screen name="EditEmployeeScreen" component={EditEmployeeScreen}/>

    </RootStack.Navigator>
);

export default RootStackScreen;