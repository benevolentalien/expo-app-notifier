import {
  MeDocument,
  useFollowMutation,
  useMeQuery,
  useSearchLazyQuery,
  useUnfollowMutation,
} from "@/graphql/__generated__";
import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
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
    refetchQueries: [MeDocument],
  });

  const [unfollow] = useUnfollowMutation({
    refetchQueries: [MeDocument],
  });

  const [search, result] = useSearchLazyQuery();

  const handleSearch = useCallback(() => {
    search({
      variables: {
        username: username || "why is this being called on mount?!",
      },
    });
  }, [username]);

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
        onPress={handleSearch}
        disabled={result.loading || !username}
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
