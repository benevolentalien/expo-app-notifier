import { useUserStore } from "@/contexts/user";
import {
  MeRegisterDocument,
  useMeRegisterQuery,
  useRegisterMutation,
} from "@/graphql/__generated__";
import { rollbar } from "@/rollbar";
import { ScreenProps } from "@/routes/MyStack";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, TextInput, View } from "react-native";

export default function RergisterScreen({
  navigation,
}: ScreenProps<"Register">) {
  const token = useUserStore((state) => state.token);

  const me = useMeRegisterQuery({
    onCompleted(data) {
      rollbar.info(data);
      if (data.me?.username) {
        navigation.reset({
          routes: [{ name: "Home" }],
          index: 0,
        });
      }
    },
    nextFetchPolicy: "no-cache",
  });

  const [register, registerData] = useRegisterMutation({
    refetchQueries: [MeRegisterDocument],
  });

  const [username, setUsername] = useState("");

  const handleRegister = useCallback(() => {
    register({
      variables: { newUser: { token, username } },
    });
  }, [token, username]);

  if (me.loading) return <ActivityIndicator />;

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <Button
        onPress={handleRegister}
        title="Register"
        disabled={!Boolean(username) || registerData.loading}
      />
    </View>
  );
}
