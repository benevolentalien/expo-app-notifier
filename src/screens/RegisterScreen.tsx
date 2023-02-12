import { useUserStore } from "@/contexts/user";
import {
  useMeQuery,
  useRegisterMutation,
  useUpdateTokenMutation,
} from "@/graphql/__generated__";
import { ScreenProps } from "@/routes/MyStack";
import { gql } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";

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
  const { token, setToken, setId } = useUserStore((state) => state);

  const me = useMeQuery({
    onCompleted(data) {
      if (!data.me) {
        return;
      }
      if (data.me.token != token) {
        updateToken({ variables: { token } });
      } else if (data.me.username) {
        setId(data.me.id)

        navigation.reset({
          routes: [{ name: "Home" }],
          index: 0,
        });
      }
    },
  });

  const [updateToken, updateData] = useUpdateTokenMutation({
    onCompleted(data, clientOptions) {
      console.log("token updated");
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
