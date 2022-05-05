// https://www.pluralsight.com/guides/using-react's-context-api-with-typescript

import React, { useState, useContext, createContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useMeQuery } from './lib/api';

import { APP_TOKEN_KEY } from './app-constants';

export type AppContextType = {
  loading: boolean;
  user: any;
  setToken: (token: string) => void;
  clear: () => void;
  refresh: () => void;
};

export const AppContext = createContext<AppContextType>({
  loading: false,
  user: null,
  setToken: (token: string) => null,
  clear: () => null,
  refresh: () => null,
});

export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const { isFetching, ...meQuery } = useMeQuery({ enabled: false });

  const [user, setUser] = useState<any | null>(null);

  const setToken = async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem(APP_TOKEN_KEY, token);

      try {
        await refresh();
      } catch (err: any) {
        console.log('Failed to load user profile info', err?.message);
      }
    } else {
      await AsyncStorage.removeItem(APP_TOKEN_KEY);
      setUser(null);
    }
  };

  const refresh = async () => {
    const meResponse = await meQuery.refetch();
    setUser(meResponse?.data?.user);
  };

  const clear = () => {
    setUser(null);
  };

  useEffect(() => {
    async function initialize() {
      const token = await AsyncStorage.getItem(APP_TOKEN_KEY);
      setToken(token);
    }

    initialize();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading: isFetching,
        refresh,
        clear,
        user,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
