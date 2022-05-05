import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppContext } from './app-context';

import { PhoneSignInCodeRequest } from './screens/PhoneSignInCodeRequest';
import { PhoneSignIn } from './screens/PhoneSignIn';
import { Start } from './screens/Start';

import { Home } from './screens/Home';
import { ProfileUpdate } from './screens/ProfileUpdate';
import { AccountSettings } from './screens/AccountSettings';
import { PlaceList } from './screens/PlaceList';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  const { user } = useAppContext();

  const isAuthenticated = user && user.id;

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Screen name="Home" component={Home} />
            <Screen name="PlaceList" component={PlaceList} />
            <Screen name="AccountSettings" component={AccountSettings} />
            <Screen name="Profile" component={ProfileUpdate} />
          </>
        ) : (
          <>
            <Screen
              name="Start"
              component={Start}
              options={{
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isAuthenticated ? 'pop' : 'push',
              }}
            />
            {/* prettier-ignore */}
            <Screen name="PhoneSignInCodeRequest" component={PhoneSignInCodeRequest} />
            <Screen name="PhoneSignIn" component={PhoneSignIn} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
