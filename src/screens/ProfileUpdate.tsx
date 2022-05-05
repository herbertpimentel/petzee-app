import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput } from '../components/TextInput';
import { useUpdateProfileMutation } from '../lib/api';
import { useAppContext } from '../app-context';

const profileDataSchema = Yup.object().shape({
  name: Yup.string().required('Digite seu nome'),
  nickname: Yup.string().optional(),
  bio: Yup.string().optional(),
  // email: Yup.string().email(),
});

export const ProfileUpdate = () => {
  const navigation = useNavigation();
  const { user, refresh, loading } = useAppContext();

  const { isLoading, ...mutation } = useUpdateProfileMutation(user.id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      nickname: user.nickname,
      bio: user.bio,
    },
    resolver: yupResolver(profileDataSchema),
  });

  const onSubmit = async (payload: any) => {
    try {
      await mutation.mutateAsync(payload as any);
      await refresh();
      navigation.navigate('AccountSettings' as never);
    } catch (err: any) {
      Alert.alert(err.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Name</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
          </View>
        )}
        name="name"
      />
      {errors.name && (
        <Text style={{ color: 'red' }}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Nickname</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
          </View>
        )}
        name="nickname"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Bio</Text>
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
          </View>
        )}
        name="bio"
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>{isLoading || loading ? 'Saving...' : 'Continuar'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
