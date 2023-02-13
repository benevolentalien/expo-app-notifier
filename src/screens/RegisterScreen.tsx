import { useUserStore } from "@/contexts/user";
import {
  useMeQuery,
  useRegisterMutation,
  useUpdateTokenMutation,
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

gql`
  mutation UpdateToken($token: String) {
    updateToken(token: $token) {
      token
    }
  }
`;

export default function RergisterScreen({
  navigation,
}: ScreenProps<"Register">) {
  const { token, setToken } = useUserStore((state) => state);

  const me = useMeQuery({
    onCompleted(data) {
      if (!data.me) {
        return;
      }
      if (!data.me.token || data.me.token !== token) {
        rollbar.info("token updated");
        if (!token) rollbar.warn("nao tem token");

        updateToken({ variables: { token } });
      } else {
        navigation.reset({
          routes: [{ name: "Home" }],
          index: 0,
        });
      }
    },
    fetchPolicy: "no-cache",
  });

  const [updateToken, updateData] = useUpdateTokenMutation({
    onCompleted(data) {
      setToken(data.updateToken?.token ?? undefined);
      me.refetch();
    },
  });

  const [register, registerData] = useRegisterMutation({
    onCompleted() {
      me.refetch();
    },
  });

  const [username, setUsername] = useState("");

  if (me.loading || updateData.loading || registerData.loading)
    return <ActivityIndicator />;

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
        disabled={!Boolean(username)}
      />
    </View>
  );
}
