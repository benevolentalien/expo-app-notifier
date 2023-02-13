import Test from "@/a/Test";
import { useUserStore } from "@/contexts/user";
import { useMeQuery, useUpdateTokenMutation } from "@/graphql/__generated__";
import { rollbar } from "@/rollbar";
import { ScreenProps } from "@/routes/MyStack";
import { onLogout } from "@/utils/GoogleSignIn";
import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { Button, View, Text } from "react-native";

gql`
  mutation UpdateToken($token: String) {
    updateToken(token: $token) {
      token
    }
  }
`;

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const { token, setToken } = useUserStore((state) => state);

  const { data } = useMeQuery();

  useEffect(() => {
    if (!data?.me?.token || data.me.token !== token) {
      updateToken({ variables: { token } });
    }
  }, [token, data]);

  const [updateToken] = useUpdateTokenMutation({
    onCompleted(data) {
      rollbar.info("token updated", data);
      setToken(data.updateToken?.token ?? undefined);
    },
  });

  return (
    <View>
      <Test />
      <Text>
        {data?.me?.username} ({data?.me?.followersCount} followers)
      </Text>
      <Button title="search" onPress={() => navigation.navigate("Follow")} />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}
