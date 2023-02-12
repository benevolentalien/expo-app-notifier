import {
  useSendNotificationMutation,
} from "@/graphql/__generated__";
import { gql } from "@apollo/client";
import { rollbar } from "@/rollbar";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

gql`
  mutation sendNotification($message: NotificationInput!) {
    sendNotification(message: $message) {
      id
      message
      status
    }
  }
`;

export default function Test() {
  const [message, setMessage] = useState("");

  const [sendNotification] = useSendNotificationMutation({
    variables: {
      message: {
        body: message,
      },
    },
    onCompleted() {
      setMessage("");
    },
  });

  return (
    <View>
      <TextInput
        placeholder="Message"
        onChangeText={setMessage}
        value={message}
      />
      <Button title="send" onPress={sendNotification as any} disabled={!Boolean(message)} />
    </View>
  );
}

const styles = StyleSheet.create({});
