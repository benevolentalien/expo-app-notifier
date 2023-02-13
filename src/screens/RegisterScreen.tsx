import { useUserStore } from "@/contexts/user";
import {
  MeDocument,
  useMeQuery,
  useRegisterMutation,
} from "@/graphql/__generated__";
import { rollbar } from "@/rollbar";
import { ScreenProps } from "@/routes/MyStack";
import { gql } from "@apollo/client";
import React, { useState } from "react";
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
      if (!data.me?.username) return;

      navigation.reset({
        routes: [{ name: "Home" }],
        index: 0,
      });
    },
  });

  const [register, registerData] = useRegisterMutation({
    refetchQueries: [MeDocument],
  });

  const [username, setUsername] = useState("");

  if (me.loading) return <ActivityIndicator />;

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <Button
        onPress={() =>
          register({
            variables: { newUser: { token, username } },
          })
        }
        title="Register"
        disabled={!Boolean(username) || registerData.loading}
      />
    </View>
  );
}
