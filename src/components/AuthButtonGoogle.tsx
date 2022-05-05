import { TouchableOpacity, Text, Alert } from 'react-native';

import * as AuthSession from 'expo-auth-session';

import { useAppContext } from '../app-context';

export const AuthButtonGoogle = () => {
  const { setToken } = useAppContext();

  const handleGoogleAuthentication = async () => {
    const authUrl = `${process.env.BACKEND_URL}/auth/google-signin?redirect_url=${process.env.AUTH_REDIRECT_URL}`;

    const { params } = (await AuthSession.startAsync({
      authUrl,
    })) as any;

    if (params.status === 'success') {
      setToken(params.token);
    } else {
      Alert.alert(params.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleGoogleAuthentication}>
      <Text>SignIn with Google</Text>
    </TouchableOpacity>
  );
};
