import { ChevronRightIcon } from "lucide-react";

const PROGRESS_STEPS = ["Select Dentist", "Select Time", "Confirm Appointment"];

const ProgressSteps = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {PROGRESS_STEPS.map((step, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 ${
            index < currentStep ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <span className="w-8 h-8 grid place-items-center rounded-full bg-primary/20">
            {index + 1}
          </span>
          <span>{step}</span>
          {index < PROGRESS_STEPS.length - 1 && (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
