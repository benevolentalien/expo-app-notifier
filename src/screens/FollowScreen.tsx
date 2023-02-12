import {
  useFollowMutation,
  useMeQuery,
  useSearchLazyQuery,
  useSearchQuery,
  useSendNotificationMutation,
  useUnfollowMutation,
} from "@/graphql/__generated__";
import { gql } from "@apollo/client";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";

gql`
  mutation follow($id: BigInteger!) {
    follow(id: $id) {
      following {
        id
      }
    }
  }
`;

gql`
  mutation unfollow($id: BigInteger!) {
    unfollow(id: $id) {
      following {
        id
      }
    }
  }
`;

gql`
  query search($username: String!) {
    search(username: $username) {
      id
      username
    }
  }
`;

export default function FollowScreen() {
  const [username, setUsername] = useState("");

  const [follow] = useFollowMutation({
    onCompleted() {
      me.refetch();
    },
  });

  const [unfollow] = useUnfollowMutation({
    onCompleted() {
      me.refetch();
    },
  });

  const [search, result] = useSearchLazyQuery();

  const me = useMeQuery();

  return (
    <View>
      <TextInput
        placeholder="Message"
        onChangeText={setUsername}
        value={username}
      />
      <Button
        title="search"
        onPress={() => search({ variables: { username } })}
      />
      {result.data?.search?.map((user) => (
        <View key={user?.id}>
          <Text>{user?.username}</Text>
          {me.data?.me?.followers?.map((f) => f?.id).includes(user?.id) ? (
            <Button
              title="unfollow"
              onPress={() => unfollow({ variables: { id: user?.id } })}
            />
          ) : (
            <Button
              title="follow"
              onPress={() => follow({ variables: { id: user?.id } })}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
