import { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { TextInput } from '../components/TextInput';
import { usePhoneSignInMutation } from '../lib/api';
import { useAppContext } from '../app-context';

type ParamList = {
  PhoneSignIn: { phone: string };
};

export const PhoneSignIn = () => {
  const route = useRoute<RouteProp<ParamList, 'PhoneSignIn'>>();

  const { setToken } = useAppContext();

  const [code, setCode] = useState('');

  const mutation = usePhoneSignInMutation();

  const handleCodeRequest = async () => {
    try {
      const payload = { phone: route.params.phone, code };
      const response = await mutation.mutateAsync(payload as any);

      setToken(response?.data?.access_token);
    } catch (err: any) {
      Alert.alert(err.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Enter the code you received on your phone</Text>
      <TextInput
        onChangeText={setCode}
        value={code}
        keyboardType={'phone-pad'}
      />
      <TouchableOpacity onPress={handleCodeRequest}>
        <Text>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
