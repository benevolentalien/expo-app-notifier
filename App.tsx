import { useUserStore } from "@/contexts/user";
import { client } from "@/graphql/client";
import MyStack from "@/routes/MyStack";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import ErrorBoundary from "@/ErrorBoundary";
import { rollbar } from "@/rollbar";
import registerForPushNotificationsAsync from "@/utils/registerForPushNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // priority: AndroidNotificationPriority.HIGH
  }),
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const setToken = useUserStore((store) => store.setToken);

  useEffect(() => {
    registerForPushNotificationsAsync("@benevolentalien/notificator")
      .then(setToken)
      .then(SplashScreen.hideAsync)
      .catch(rollbar.error);
  }, []);

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </ApolloProvider>
    </ErrorBoundary>
  );
}
