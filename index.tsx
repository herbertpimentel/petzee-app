import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { QueryClient, QueryClientProvider } from 'react-query';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

import { ThemeProvider } from 'styled-components/native';
import appTheme from './src/theme/app-theme';

import { AppContextProvider } from './src/app-context';

import { AppRoutes } from './src/app-routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus:
        process.env.REACT_APP_REFETCH_ON_FOCUS === 'true' ||
        process.env.REACT_APP_REFETCH_ON_FOCUS === undefined,
    },
  },
});

const BootstrapApp = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  let AppComponent = <AppRoutes />;

  if (!fontsLoaded) {
    AppComponent = <AppLoading />;
  }

  return (
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>{AppComponent}</AppContextProvider>
      </QueryClientProvider>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
    </ThemeProvider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(BootstrapApp);
