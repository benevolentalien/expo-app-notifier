import { onGoogleButtonPress } from "@/utils/GoogleSignIn";
import Env from "@env";
import React, { useCallback, useState } from "react";
import { Button, View, Text } from "react-native";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleLogin = useCallback(() => {
    setLoading(true);
    onGoogleButtonPress()
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <Text>{Env.apiUrl}</Text>
      <Text>{JSON.stringify(error)}</Text>
      <Button title="Login" onPress={handleLogin} disabled={loading} />
    </View>
  );
}
