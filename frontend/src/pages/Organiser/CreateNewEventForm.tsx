import React, { useState } from "react";
import EMSForm1 from "./EMSForm1";
import EMSForm2 from "./EMSForm2";
import EMSForm3 from "./EMSForm3";
import { Formik, Form, Field } from "formik";

interface Data {
  eventID: string;
  organizerClub: string | ClubOption;
  organizerEmail: string;
  organizerPersonInCharge: string;
  organizerContactNumber: string;
  collaboration: boolean;
  collaboratorClub: string[];
  collaboratorEmail: string;
  collaboratorPersonInCharge: string;
  collaboratorContactNumber: string;
  // Add more fields for EMSForm3
  eventName: string;
  eventObjective: string;
  attendees: number;
  selectedEventCategories: string[];
  eventCategoryOther: string;
  activityAssessment: ActivityAssessment;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurringEvent: boolean;
  eventFrequency: string;
  eventProposal: File | null;
  remarks: string;
  eventMode: "Physical" | "Virtual" | "";
  // ...
}

interface ClubOption {
  value: string;
  label: string;
}

interface ActivityAssessment {
  [key: string]: boolean;
}

function CreateNewEventForm() {
  const [data, setData] = useState<Data>({
    // EMSForm1
    eventID: "",
    organizerClub: "",
    organizerEmail: "",
    organizerPersonInCharge: "",
    organizerContactNumber: "",
    collaboration: false,
    // EMSForm2
    collaboratorClub: [],
    collaboratorEmail: "",
    collaboratorPersonInCharge: "",
    collaboratorContactNumber: "",
    // EMSForm3
    eventName: "",
    eventObjective: "",
    attendees: 0,
    selectedEventCategories: [],
    eventCategoryOther: "",
    activityAssessment: {},
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    recurringEvent: false,
    eventFrequency: "",
    eventProposal: null,
    remarks: "",
    eventMode: "",
    // ...
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (
    newData: Partial<Data>,
    final: boolean = false,
    skipTo: number = 0
  ) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep(final ? steps.length : skipTo);
  };

  const handlePrevStep = (newData: Partial<Data>) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <EMSForm1 next={handleNextStep} data={data} />,
    <EMSForm2 next={handleNextStep} prev={handlePrevStep} data={data} />,
    <EMSForm3 next={handleNextStep} prev={handlePrevStep} data={data} />, 
    // Add more form pages
  ];

  return <>{steps[currentStep]}</>; // Render the current step based on currentStep value
}

export default CreateNewEventForm;
