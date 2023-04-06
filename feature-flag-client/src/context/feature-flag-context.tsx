import { createContext, useContext, useEffect, useState } from "react";
import { REACT_APP_LAUNCH_DARKLY_CLIENT_ID as clientId } from "../config";
import * as LDClient from "launchdarkly-js-client-sdk";
import { getUserNameFromLocalStorage } from "../utils/localStorage";
import {
  detailsCtaFlagKey,
  launchBannerFlagKey,
  profileSectionFlagKey,
} from "../feature-flag-config";
import { Redirect } from "react-router-dom";
import LaunchDarkly from "../LaunchDarkly";

//Using a context provider gives us the ability to access the feature flags from anywhere in the app without having to pass them down as props

const launchDarkly = LaunchDarkly.getInstance();
//We get the instance of LaunchDarkly singleton class and call the initializeClient method to initialize the client with the client id and context

export type FeatureFlagContextProviderProps = {
  children: React.ReactNode;
};

export type ProfileSectionFlagType = "not-enrolled" | "control" | "variation";

export type FeatureFlagContextProps = {
  launchBannerFlag?: boolean;
  profileSectionFlag?: ProfileSectionFlagType;
  detailsCtaFlag?: string;
};

const FeatureFlagContext = createContext<FeatureFlagContextProps>(
  {} as FeatureFlagContextProps
);

const FeatureFlagContextProvider = ({
  children,
}: FeatureFlagContextProviderProps) => {
  const username = getUserNameFromLocalStorage();
  //for the purpose of this exercise, we are using the username as the key for the context

  const [flags, setFlags] = useState<FeatureFlagContextProps>({});
  //flags is the state that will hold the feature flag values

  useEffect(() => {
    if (!username) return;
    const context: LDClient.LDContext = {
      kind: "user",
      key: username,
    };

    async function initializeLaunchDarkly() {
      await launchDarkly.initializeClient(clientId as string, context);
      const launchBannerFlag = launchDarkly.getFlag(launchBannerFlagKey);
      const profileSectionFlag = launchDarkly.getFlag(profileSectionFlagKey);
      const detailsCtaFlag = launchDarkly.getFlag(detailsCtaFlagKey);
      setFlags({
        launchBannerFlag,
        profileSectionFlag,
        detailsCtaFlag,
      });
    }
    initializeLaunchDarkly();
  }, []);

  if (!username) return <Redirect to={"/login"} />;
  //The context should only be available to users who are logged in

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlagContext = () => useContext(FeatureFlagContext);
export default FeatureFlagContextProvider;
