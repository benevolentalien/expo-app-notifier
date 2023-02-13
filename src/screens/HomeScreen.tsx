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
import React, { useEffect } from "react";
import { Button, View, Text } from "react-native";

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const { token, setToken } = useUserStore((state) => state);

  const { data } = useMeHomeQuery({ nextFetchPolicy: "no-cache" });

  const [updateToken, { loading }] = useUpdateTokenMutation({
    onCompleted(data) {
      rollbar.info(data);
      setToken(data.updateToken?.token ?? undefined);
    },
    refetchQueries: [MeHomeDocument],
  });

  useEffect(() => {
    if (loading) return;

    if (!data?.me?.token || data.me.token !== token) {
      updateToken({ variables: { token } });
    }
  }, [token, data, loading]);

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
