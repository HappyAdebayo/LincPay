import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Screens/Login';
import SignUpScreen from './src/Screens/Signup';
import SplashScreen from './src/Screens/SplashScreen';
import ResetEmailScreen from './src/Screens/ResetEmail';
import VerifyResetCode from './src/Screens/VerifyCode';
import ResetPasswordScreen from './src/Screens/ChangePassword';
import PasswordResetSuccessScreen from './src/Screens/PasswordResetSuccessScreen';
import BottomTab from './src/navigation/BottomTab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ResetEmailScreen" component={ResetEmailScreen} />
        <Stack.Screen name="VerifyResetCode" component={VerifyResetCode} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="PasswordResetSuccessScreen" component={PasswordResetSuccessScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        {/*BottomTab*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
