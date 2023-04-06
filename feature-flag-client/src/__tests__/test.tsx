import { render, waitFor } from "@testing-library/react";
import FeatureFlagContextProvider from "../context/feature-flag-context";
import { MedicationDetails } from "../components/medication-details";
import { PageLayout } from "../components/page-layout";
import { getUserNameFromLocalStorage } from "../utils/localStorage";
import "@testing-library/jest-dom/extend-expect";

//At first we mock the LaunchDarkly module so that we can control the flag values
jest.mock("../LaunchDarkly", () => {
  let mockFlags: { [key: string]: any } = {
    "general-render-launch-banner": true,
    "profile-render-details-section": "variation",
    "details-section-cta-colour": "blue",
  };
  const mockInitializeClient = jest.fn();

  const mockInstance = {
    initializeClient: mockInitializeClient,
    getFlag: (flagKey: string) => {
      return mockFlags[flagKey];
    },
  };

  const mockGetInstance = jest.fn(() => mockInstance);

  const mockLD = {
    getInstance: mockGetInstance,
  };
  return mockLD;
});

//We also mock the localStorage module so that we can control the username
jest.mock("../utils/localStorage", () => {
  return {
    getUserNameFromLocalStorage: jest.fn(),
  };
});

test("renders dashboard components based on flag values", async () => {
  //We mock the getUserNameFromLocalStorage function so that we can control the username
  getUserNameFromLocalStorage.mockImplementation(() => {
    return "test";
  });

  //We render the dashboard screen and wait for the components to be rendered
  const { getByTestId } = render(
    <FeatureFlagContextProvider>
      <PageLayout className="">
        <MedicationDetails />
      </PageLayout>
    </FeatureFlagContextProvider>
  );

  //We use the waitFor method to wait for the components to be rendered and then we assert that the components are rendered based on the flag values
  await waitFor(() => {
    expect(getByTestId("medication-details")).toBeInTheDocument();
    expect(getByTestId("promotional-banner")).toBeInTheDocument();
    expect(getByTestId("request-review-button")).toHaveStyle(
      "background-color: blue"
    );
  });
});
