import { useUserStore } from "@/contexts/user";
import FollowScreen from "@/screens/FollowScreen";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Follow: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export default function MyStack() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, []);

  if (!token) return <ActivityIndicator />;

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Group
            screenOptions={{
              header: () => null,
            }}
          >
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Group>
          <Stack.Screen name="Follow" component={FollowScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => null,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
