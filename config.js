import * as Updates from 'expo-updates';

let Config = {
  apiUrl: 'http://192.168.0.197:8080/graphql',
  enableHiddenFeatures: true,
  env: Updates.channel ?? 'development',
  rollbar: '66e99ec81f924cce8ecea127c686d6f5',
  webClientId: "807776962265-llt1vpsrio16evjp9gedkpkkuejh0776.apps.googleusercontent.com"
};

if (Updates.channel === 'production') {
  Config.apiUrl = "https://cool-field-4473.fly.dev/graphql";
  Config.enableHiddenFeatures = false;
  Config.env = Updates.channel;
} else if (Updates.channel === 'staging') {
  Config.apiUrl = "https://cool-field-4473.fly.dev/graphql";
  Config.enableHiddenFeatures = true;
}

export default Config;