import { useUserStore } from "@/contexts/user";
import { client } from "@/graphql/client";
import MyStack from "@/routes/MyStack";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "@/rollbar";
import ErrorBoundary from "@/ErrorBoundary";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // priority: AndroidNotificationPriority.HIGH
  }),
});

SplashScreen.preventAutoHideAsync();

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: "@benevolentalien/notificator",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const setToken = useUserStore((store) => store.setToken);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(setToken)
      .then(SplashScreen.hideAsync);
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
