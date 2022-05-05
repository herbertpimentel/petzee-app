import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import { AuthButtonGoogle } from '../components/AuthButtonGoogle';
import { AuthButtonApple } from '../components/AuthButtonApple';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../app-context';

export const Start = () => {
  const { loading } = useAppContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 28,
          marginBottom: 30,
          fontWeight: 'bold',
        }}
      >
        Combatzilla
      </Text>

      {loading && (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'gray',
            }}
          >
            loading...
          </Text>
        </View>
      )}

      <View>
        <AuthButtonGoogle />

        <AuthButtonApple />

        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneSignInCodeRequest' as never)}
        >
          <Text>Entrar usando telefone</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
