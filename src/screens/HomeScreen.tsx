import Test from "@/a/Test";
import { useUserStore } from "@/contexts/user";
import {
  MeHomeDocument,
  useMeHomeQuery,
  useUpdateTokenMutation,
} from "@/graphql/__generated__";
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

gql`
  query MeHome {
    me {
      token
      username
      followersCount
    }
  }
`;

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const { token, setToken } = useUserStore((state) => state);

  const { data } = useMeHomeQuery({ nextFetchPolicy: "no-cache" });

  useEffect(() => {
    rollbar.info(data);
    if (!data?.me?.token || data.me.token !== token) {
      updateToken({ variables: { token } });
    }
  }, [token, data]);

  const [updateToken] = useUpdateTokenMutation({
    onCompleted(data) {
      rollbar.info(data);
      setToken(data.updateToken?.token ?? undefined);
    },
    refetchQueries: [MeHomeDocument],
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
