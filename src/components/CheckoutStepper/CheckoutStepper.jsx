import React from "react";
import { Check } from "lucide-react";

const steps = [
  { id: 1, name: "Cart", path: "/cart" },
  { id: 2, name: "Review", path: "/checkout" },
  { id: 3, name: "Payment", path: "/checkout" },
  { id: 4, name: "Complete", path: "/allorders" },
];

export default function CheckoutStepper({ currentStep = 2 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                  isCompleted 
                  ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/30" 
                  : isActive 
                    ? "bg-primary-50 border-primary-500 text-primary-600 shadow-xl shadow-primary-600/10 scale-110" 
                    : "bg-white border-gray-100 text-gray-300"
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${
                isCompleted || isActive ? "text-gray-900" : "text-gray-300"
              }`}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="w-8 h-[2px] mx-1 rounded-full overflow-hidden bg-gray-100 flex items-center">
                <div 
                  className={`h-full bg-primary-600 transition-all duration-700 ${
                    isCompleted ? "w-full opacity-100 scale-x-100" : "w-0 opacity-0 scale-x-0"
                  }`} 
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
