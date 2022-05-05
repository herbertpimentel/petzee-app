import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppContext } from '../app-context';

import { Me } from '../components/Me';

export const AccountSettings = () => {
  const navigation = useNavigation();
  const { clear } = useAppContext();

  return (
    <View>
      <Me />

      <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
        <Text>Edit profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => clear()}>
        <Text>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};
