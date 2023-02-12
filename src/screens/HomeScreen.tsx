import Test from "@/a/Test";
import { ScreenProps } from "@/routes/MyStack";
import { onLogout } from "@/utils/GoogleSignIn";
import React from "react";
import { Button, View } from "react-native";

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  return (
    <View>
      <Test />
      <Button title="search" onPress={() => navigation.navigate("Follow")} />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}
