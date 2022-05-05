import axios from 'axios';

import { useMutation, useQuery } from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { APP_TOKEN_KEY } from '../app-constants';

export const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem(APP_TOKEN_KEY);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status == 403) {
      await AsyncStorage.removeItem(APP_TOKEN_KEY);
    }

    return Promise.reject(error);
  }
);

export const usePhoneSignInCodeRequestMutation = () => {
  return useMutation(({ phone }: { phone: string }) =>
    api.post('/auth/phone-signin', { credential: phone })
  );
};

export const usePhoneSignInMutation = () => {
  return useMutation(({ phone, code }: { phone: string; code: string }) =>
    api.put('/auth/phone-signin', { credential: phone, code })
  );
};

export const useMeQuery = (options = {}) => {
  return useQuery(
    ['me'],
    async () => (await api.get('/auth/me'))?.data,
    options
  );
};

export const useUpdateProfileMutation = (id: string) => {
  return useMutation((data) => api.patch(`/users/${id}/profile`, data));
};

export const useGetPlacesQuery = () => {
  return useQuery(['places'], async () => (await api.get('/places')).data);
};
