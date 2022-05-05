import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PlaceList' as never)}
        >
          <Text>Place list</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AccountSettings' as never)}
        >
          <Text>Account Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
