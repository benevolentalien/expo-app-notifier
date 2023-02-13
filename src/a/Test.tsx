import { useSendNotificationMutation } from "@/graphql/__generated__";
import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function Test() {
  const [message, setMessage] = useState("");

  const [sendNotification, { loading }] = useSendNotificationMutation();

  const handleSendNotification = useCallback(() => {
    sendNotification({
      variables: {
        message: {
          body: message,
        },
      },
    }).then(() => setMessage(""));
  }, [message]);

  return (
    <View>
      <TextInput
        placeholder="Message"
        onChangeText={setMessage}
        value={message}
      />
      <Button
        title="send"
        onPress={handleSendNotification}
        disabled={!Boolean(message) || loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
