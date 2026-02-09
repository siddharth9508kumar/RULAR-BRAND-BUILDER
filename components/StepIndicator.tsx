
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  "Category",
  "Basics",
  "Identity",
  "Logo",
  "Guidelines",
  "Poster"
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={step} className="flex flex-col items-center relative flex-1">
              {/* Connector */}
              {index > 0 && (
                <div className={`absolute left-[-50%] top-5 w-full h-[2px] -z-10 ${
                  isCompleted ? 'bg-indigo-500' : 'bg-slate-200'
                }`} />
              )}
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-50' : 
                isCompleted ? 'bg-indigo-500 text-white' : 
                'bg-white text-slate-400 border-2 border-slate-200'
              }`}>
                {isCompleted ? <i className="fa-solid fa-check"></i> : stepNum}
              </div>
              <span className={`mt-3 text-[10px] font-bold uppercase tracking-wider ${
                isActive ? 'text-indigo-600' : 'text-slate-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
