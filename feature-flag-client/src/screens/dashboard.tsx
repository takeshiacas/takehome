import React from "react";
import { MedicationDetails } from "../components/medication-details";
import { PageLayout } from "../components/page-layout";
import { useMedication, useUser } from "../mock-data";
import FeatureFlagContextProvider from "../context/feature-flag-context";

export const DashboardScreen = () => {
  const user = useUser();
  const medication = useMedication();

  return (
    //We wrap the dashboard screen with the feature flag context provider so that we can use the feature flag context in the components
    <FeatureFlagContextProvider>
      <PageLayout className="dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard-details">
          <h3>Your information</h3>
          <ul>
            <li>Name: {user.name}</li>
            <li>Age: {user.age}</li>
            <li>Country: {user.country}</li>
          </ul>
        </div>
        <div className="dashboard-details">
          <h3>Your medication</h3>
          <ul>
            <li>Medication: {medication.name}</li>
            <li>Repeats left: {medication.repeatsLeft}</li>
            <li>Instructions: {medication.instructions}</li>
          </ul>
          <MedicationDetails />
        </div>
      </PageLayout>
    </FeatureFlagContextProvider>
  );
};
