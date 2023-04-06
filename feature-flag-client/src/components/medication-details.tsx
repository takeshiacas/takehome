import React from "react";
import { useMedication } from "../mock-data";
import { RequestReviewButton } from "./request-review-button";
import { useFeatureFlagContext } from "../context/feature-flag-context";

// Problem:
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name:
//     profile-render-details-section
// Setup:
//     Show to users with flag value 'variation'
export const MedicationDetails = () => {
  const medication = useMedication();
  //It's simple, we only render it when the flag value is variation
  const { profileSectionFlag } = useFeatureFlagContext();
  if (profileSectionFlag === "variation")
    return (
      <div data-testid="medication-details">
        <ul>
          <li>Common side effects: {medication.sideEffects}</li>
          <li>Warning signs: {medication.warnings}</li>
        </ul>
        <p>Experiencing any of these? Please contact your doctor</p>
        <RequestReviewButton />
      </div>
    );
  return <></>;
};
