import { useState } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TextInput } from '../components/TextInput';
import { usePhoneSignInCodeRequestMutation } from '../lib/api';

type PhoneSignInParams = {
  PhoneSignIn: { phone: string };
};

export const PhoneSignInCodeRequest = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PhoneSignInParams>>();

  const [phone, setPhone] = useState('');

  const mutation = usePhoneSignInCodeRequestMutation();

  const handleCodeRequest = async () => {
    try {
      const payload = { phone };
      await mutation.mutateAsync(payload as any);

      navigation.navigate('PhoneSignIn', { phone });
    } catch (err) {
      Alert.alert(String(err));
    }
  };

  return (
    <View>
      <Text>Enter your phone number</Text>
      <TextInput
        onChangeText={setPhone}
        value={phone}
        keyboardType={'number-pad'}
      />
      <TouchableOpacity onPress={handleCodeRequest}>
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};
