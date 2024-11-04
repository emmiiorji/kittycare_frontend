import React from "react";
import Suggestions from "./Panel15/components/Suggestions";
import Timeline from "./Panel15/components/Timeline";
import DateSelection from "./Panel15/components/DateSelection";
import EnvironmentalEnrichmentSuggestions from "./Panel15/components/EnvironmentalEnrichmentSuggestions";
import GoalSummary from "./Panel15/components/GoalSummary";
import { useNavigate } from "react-router-dom";
import { Panel15Props } from "../../types/panel.types";
const Panel15: React.FC<Panel15Props> = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full lg:max-w-4xl mx-auto p-4 lg:p-6 font-inter">
      <div className="text-center mb-8">
        <h1 className="font-bold text-xl lg:text-3xl mb-2">
          Your Cat’s Personalized Plan & Insights Let’s Keep Your Cat Healthy
          and Happy!
        </h1>
        <p className="text-sm lg:text-md text-darkGray max-w-2xl mx-auto">
          Here’s your cat’s custom care plan based on everything you’ve told us.
          We’ve tailored this to help you and your cat reach your goals. Let’s
          dive into the details!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-start justify-center">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 mb-8 lg:mb-0">
          <GoalSummary />
          <Suggestions />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8">
          <Timeline />
          <DateSelection />
          <EnvironmentalEnrichmentSuggestions />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/cat-assistant")}
          className="bg-primaryBlue text-white px-6 py-2 rounded-full hover:bg-opacity-90 text-base lg:text-lg"
        >
          Explore My Plan
        </button>
      </div>
    </div>
  );
};

export default Panel15;
