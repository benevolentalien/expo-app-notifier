import Test from "@/a/Test";
import { useMeQuery } from "@/graphql/__generated__";
import { ScreenProps } from "@/routes/MyStack";
import { onLogout } from "@/utils/GoogleSignIn";
import React from "react";
import { Button, View, Text } from "react-native";

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const { data } = useMeQuery();

  return (
    <View>
      <Test />
      <Text>{data?.me?.username} ({data?.me?.followersCount} followers)</Text>
      <Button title="search" onPress={() => navigation.navigate("Follow")} />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}
