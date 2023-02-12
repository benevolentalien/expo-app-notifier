// import { Client, Configuration } from "rollbar-react-native";
// import config from "../config";

// export const rollbar = new Client(
//   new Configuration(config.rollbar, {
//     environment: config.env,
//   })
// );

export const rollbar = {
  log (...a: any) {
    console.log(a)
  },
  error (...a: any) {
    console.error(a)
  }
}