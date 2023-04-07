import React from "react";
import { useFeatureFlagContext } from "../context/feature-flag-context";

// Problem:
//     This should be coloured based on FF value
// Feature flag name:
//     details-section-cta-colour
// Setup:
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const { detailsCtaFlag } = useFeatureFlagContext();
  return (
    <button
      data-testid="request-review-button"
      style={{
        backgroundColor: detailsCtaFlag,
      }}
    >
      Request doctor review
    </button>
  );
};
