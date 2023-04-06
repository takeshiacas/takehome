import { render, waitFor } from "@testing-library/react";
import FeatureFlagContextProvider from "../context/feature-flag-context";
import { MedicationDetails } from "../components/medication-details";
import { PageLayout } from "../components/page-layout";
import { RequestReviewButton } from "../components/request-review-button";
import { getUserNameFromLocalStorage } from "../utils/localStorage";
import "@testing-library/jest-dom/extend-expect";
import LaunchDarkly from "../LaunchDarkly";

jest.mock("../LaunchDarkly", () => {
  const mockLaunchDarkly = {
    initializeClient: jest.fn(),
    getInstance: jest.fn().mockReturnValue({
      initializeClient: jest.fn(),
      getFlag: jest.fn(),
    }),
  };
  return mockLaunchDarkly;
});
jest.mock("../utils/localStorage", () => {
  return {
    getUserNameFromLocalStorage: jest.fn(),
  };
});
jest.mock("launchdarkly-js-client-sdk", () => {
  const ldClient = {
    on: jest.fn(),
  };
  return {
    initialize: () => ldClient,
  };
});

test("renders dashboard components based on flag values", async () => {
  getUserNameFromLocalStorage.mockImplementation(() => {
    return "test";
  });

  // const mockInitializeClient = LaunchDarkly.getInstance()
  //   .initializeClient as jest.Mock;
  // mockInitializeClient.mockImplementation(() => {
  //   return Promise.resolve();
  // });

  const { getByTestId } = render(
    <FeatureFlagContextProvider>
      <PageLayout className="">
        <MedicationDetails />
        <RequestReviewButton />
      </PageLayout>
    </FeatureFlagContextProvider>
  );

  await waitFor(() => {
    expect(getByTestId("medication-details")).toBeInTheDocument();
    expect(getByTestId("promotional-banner")).toBeInTheDocument();
  });
});
