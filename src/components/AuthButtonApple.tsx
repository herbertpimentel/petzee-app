import { TouchableOpacity, Text, Platform, Alert } from 'react-native';

// import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

import { useAppContext } from '../app-context';

interface AppleCredentials {
  fullName: {
    familyName: string;
    givenName: String;
  };
  email: string;
  user: string;
}

export const AuthButtonApple = () => {
  // const handleAppleAuthentication = async () => {
  //   const credentials = (await AppleAuthentication.signInAsync({
  //     requestedScopes: [
  //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //     ],
  //   })) as AppleCredentials;

  //   // call event for it
  // };

  const { setToken } = useAppContext();

  const handleAppleAuthentication = async () => {
    const authUrl = `${process.env.BACKEND_URL}/auth/apple-signin?redirect_url=${process.env.AUTH_REDIRECT_URL}`;

    const { params } = (await AuthSession.startAsync({
      authUrl,
    })) as any;

    if (params.status === 'success') {
      setToken(params.token);
    } else {
      Alert.alert(params.message);
    }
  };

  // if (Platform.OS !== 'ios') {
  //   return null;
  // }

  return (
    <TouchableOpacity onPress={handleAppleAuthentication}>
      <Text>SignIn with Apple</Text>
    </TouchableOpacity>
  );
};
