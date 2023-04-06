import { config } from "dotenv";
import { cleanEnv, str } from "envalid";
config({ path: ".env" });

export const { REACT_APP_LAUNCH_DARKLY_CLIENT_ID } = process.env;

//This function is in charge of validating the environment variables. We don't let the app to run without the clientId
export function validateEnv() {
  cleanEnv(process.env, {
    REACT_APP_LAUNCH_DARKLY_CLIENT_ID: str(),
  });
}
