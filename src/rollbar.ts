import Rollbar from "rollbar";
import config from "@env";

export const rollbar = Rollbar.init({
  accessToken: config.rollbar,
  environment: config.env,
});
