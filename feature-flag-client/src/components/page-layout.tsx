import React from "react";
import { useFeatureFlagContext } from "../context/feature-flag-context";

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     general-render-launch-banner
// Setup:
//     Show to users with flag value: true
const PromotionalBanner = () => (
  <div className="promotional-banner" data-testid="promotional-banner">
    <p>50% launch sale! Use code TAKEHOME</p>
  </div>
);

export const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  //PageLayout is in featureFlagContextProvider only in dashboard page and the promotional banner is only shown to users when flag value is true
  const { launchBannerFlag } = useFeatureFlagContext();
  return (
    <div className={`page-layout ${className}`}>
      {launchBannerFlag && <PromotionalBanner />}
      {children}
    </div>
  );
};
