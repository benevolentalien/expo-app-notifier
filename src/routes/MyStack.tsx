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

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Follow: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

interface MyStackProps {
  loggedIn: boolean;
}

export default function MyStack({ loggedIn }: MyStackProps) {
  return (
    <Stack.Navigator initialRouteName={loggedIn ? "Register" : "Login"}>
      {loggedIn ? (
        <>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Follow" component={FollowScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
