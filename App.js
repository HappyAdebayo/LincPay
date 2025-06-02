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
import NotificationScreen from './src/Screens/NotificationScreen';
import WithdrawMoneyScreen from './src/Screens/WithdrawalScreen';
import AddMoneyScreen from './src/Screens/AddMoney';
import HelpCenterScreen from './src/Screens/HelpCenter';
import ContactSupportScreen from './src/Screens/ContactSupport';
import TransferMoneyScreen from './src/Screens/TransferMoney';
import SecurityScreen from './src/Screens/SecurityScreen';
import PersonalInfoScreen from './src/Screens/PersonalInfo';
import ProfileSetupScreen from './src/Screens/ProfileSetupSreen';
import Auth from './src/Screens/Auth';
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
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="WithdrawMoneyScreen" component={WithdrawMoneyScreen} />
        <Stack.Screen name="AddMoneyScreen" component={AddMoneyScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="ContactSupportScreen" component={ContactSupportScreen} />
        <Stack.Screen name="TransferMoneyScreen" component={TransferMoneyScreen} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
        <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
        <Stack.Screen name="ProfileSetupScreen" component={ProfileSetupScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        {/*  Auth */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



