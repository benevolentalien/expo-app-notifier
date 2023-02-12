import Constants from "expo-constants";

export default {
  apiUrl: Constants.expoConfig?.extra?.API_URL,
  env: Constants.expoConfig?.extra?.ENV,
  rollbar: "66e99ec81f924cce8ecea127c686d6f5",
  webClientId:
    "807776962265-llt1vpsrio16evjp9gedkpkkuejh0776.apps.googleusercontent.com",
  enableHiddenFeatures: Constants.expoConfig?.extra?.ENV !== "production",
};
