const pkg = require("./package.json")

export default () => ({
  expo: {
    name: "notificator",
    slug: "notificator",
    version: pkg.version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/adaptive-icon.png",
          color: "#ffffff",
        },
      ],
      "@react-native-firebase/app",
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/auth",
    ],
    notification: {
      icon: "./assets/adaptive-icon.png",
      color: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      package: "dev.monx.notifier",
      googleServicesFile: "./google-services.json",
      versionCode: 23,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      API_URL: process.env.API_URL ?? "http://192.168.0.197:8080/graphql",
      ENV: process.env.ENV ?? "development",
      eas: {
        projectId: "cc83e065-00ed-4ab9-ab30-6742251666c9",
      },
    },
  },
});
