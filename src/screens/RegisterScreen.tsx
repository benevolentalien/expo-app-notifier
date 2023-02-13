import { useUserStore } from "@/contexts/user";
import {
  MeDocument,
  useMeQuery,
  useRegisterMutation,
} from "@/graphql/__generated__";
import { rollbar } from "@/rollbar";
import { ScreenProps } from "@/routes/MyStack";
import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Button, TextInput, View } from "react-native";

gql`
  mutation Register($newUser: NewUserInput!) {
    register(newUser: $newUser) {
      id
      uid
      username
      token
    }
  }
`;

gql`
  query Me {
    me {
      id
      username
      token
      followersCount
      followers {
        id
      }
    }
  }
`;

export default function RergisterScreen({
  navigation,
}: ScreenProps<"Register">) {
  const token = useUserStore((state) => state.token);

  const me = useMeQuery({
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
    refetchQueries: [MeDocument],
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
