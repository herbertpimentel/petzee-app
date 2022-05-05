import React from 'react';

import { Text, View, Image } from 'react-native';

import { useAppContext } from '../app-context';

export const Me = () => {
  const { user } = useAppContext();

  return (
    <View>
      <View>
        <Text style={{ fontSize: 26, marginTop: 20 }}>{user?.name}</Text>

        <Text>{user?.email}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: user?.imageUrl,
          }}
        />
      </View>
    </View>
  );
};
