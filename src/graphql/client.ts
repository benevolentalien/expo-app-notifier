import { ApolloClient, createHttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import auth from "@react-native-firebase/auth";
import Env from "../../Env";
import { onError } from "@apollo/client/link/error";
import { rollbar } from "@/rollbar";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      rollbar.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) rollbar.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: Env.apiUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth().currentUser?.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});
