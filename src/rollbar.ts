import Rollbar from "rollbar";
import config from "../config";

export const rollbar = Rollbar.init({
  accessToken: config.rollbar,
  environment: config.env,
});
