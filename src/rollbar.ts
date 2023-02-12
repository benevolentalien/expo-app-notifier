import Rollbar from "rollbar";
import config from "../Env";

export const rollbar = Rollbar.init({
  accessToken: config.rollbar,
  environment: config.env,
});
