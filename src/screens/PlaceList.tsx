import React from 'react';

import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { useGetPlacesQuery } from '../lib/api';

export const PlaceList = () => {
  const { error, isLoading, data } = useGetPlacesQuery();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <>
          <Text style={{ fontSize: 26, marginTop: 20, marginBottom: 10 }}>
            Pontos de Interesse
          </Text>

          {error && (
            <Text style={{ fontSize: 10, color: 'red' }}>{String(error)}</Text>
          )}

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data?.docs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ fontSize: 20 }}>{item.name}</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'darkGray',
                      maxWidth: '80%',
                      marginTop: 4,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              )}
            />
          )}
        </>
      </View>
    </SafeAreaView>
  );
};
