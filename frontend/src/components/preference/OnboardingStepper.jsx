import React from "react";

const OnboardingStepper = ({ currentStep, steps }) => {
  // Fills connector line based on progress:
  // passed step -> full, current step -> half, upcoming -> empty.
  const getLineProgress = (stepNumber) => {
    if (currentStep > stepNumber) return "w-full";
    if (currentStep === stepNumber) return "w-1/2";
    return "w-0";
  };

  // Shared step circle styling with responsive sizing.
  const circleClass = (stepNumber) =>
    `w-[35px] h-[35px] md:w-[50px] md:h-[50px] lg:w-[52px] lg:h-[52px] rounded-full flex items-center justify-center text-[14px] md:text-[16px] lg:text-[18px] transition-all duration-500 shrink-0 ${
      currentStep >= stepNumber
        ? "bg-[#4866F6] text-white"
        : "bg-[#EFF0F6] text-[#586D93]"
    }`;

  // Base label styling used across breakpoints.
  const labelClass = (stepNumber) =>
    `mt-2 md:mt-3 text-[14px] md:text-[14px] lg:text-[16px] font-medium font-sfpro text-center leading-tight w-full max-w-[88px] lg:max-w-full lg:whitespace-nowrap ${
      currentStep >= stepNumber ? "text-[#4866F6]" : "text-[#3D3D3D]"
    }`;

  // Horizontal connector between adjacent steps.
  const Connector = ({ afterStep, className = "" }) => (
    <div
      className={`w-full h-[8px] md:h-[10px] bg-[#EFF0F6] rounded-full overflow-hidden self-start mt-[12px] md:mt-[21px] lg:mt-[22px] ${className}`}
    >
      <div
        className={`h-full bg-[#4866F6] transition-all duration-500 ${getLineProgress(afterStep)}`}
      />
    </div>
  );

  // Compact step item used in mobile's 2-row layout.
  const MobileStepItem = ({ index }) => {
    const stepNumber = index + 1;

    return (
      <div className="flex flex-col items-center relative z-10 max-w-[60px] md:max-w-[88px]">
        <div className={circleClass(stepNumber)}>{stepNumber}</div>
        <p className={labelClass(stepNumber)}>{steps[index]}</p>
      </div>
    );
  };

  // Step item used for tablet/desktop single-row layout.
  const StepItem = ({ index }) => {
    const stepNumber = index + 1;

    return (
      <div className="flex flex-col items-center relative z-10 w-[72px] sm:w-[84px] md:w-[75px] lg:w-[110px]">
        <div className={circleClass(stepNumber)}>{stepNumber}</div>
        <p
          className={`${labelClass(stepNumber)} ${
            index === 2 || index === 3
              ? "md:max-w-[72px] md:whitespace-normal lg:max-w-full"
              : "md:max-w-[130px] md:whitespace-nowrap lg:max-w-full"
          }`}
        >
          {/* Tablet-only text behavior:
              - Step 3/4 split into two lines for readability.
              - Other steps stay one line on tablet.
              - Mobile/desktop render normal full labels. */}
          {index === 2 ? (
            <>
              <span className="hidden md:inline lg:hidden">Connect</span>
              <span className="hidden md:inline lg:hidden">
                <br />
              </span>
              <span className="hidden md:inline lg:hidden">Integrations</span>
              <span className="md:hidden lg:inline">Connect Integrations</span>
            </>
          ) : index === 3 ? (
            <>
              <span className="hidden md:inline lg:hidden">Notification</span>
              <span className="hidden md:inline lg:hidden">
                <br />
              </span>
              <span className="hidden md:inline lg:hidden">Setup</span>
              <span className="md:hidden lg:inline">Notification Setup</span>
            </>
          ) : (
            steps[index]
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full mt-[30px] md:mt-[50px] lg:mt-[70px]">
      {/* Mobile — row 1: steps 1–3, row 2: steps 4–5 centered */}
      <div className="flex flex-col gap-8 md:hidden">
        <div
          className="grid w-full items-start"
          style={{ gridTemplateColumns: "auto 1fr auto 1fr auto" }}
        >
          <MobileStepItem index={0} />
          <Connector afterStep={1} className="flex-1" />
          <MobileStepItem index={1} />
          <Connector afterStep={2} className="flex-1" />
          <MobileStepItem index={2} />
        </div>

        <div
          className="grid w-[59%] max-[425px]:w-[62%] max-[375px]:w-[62.5%] mx-auto items-start"
          style={{ gridTemplateColumns: "auto 1fr auto" }}
        >
          <MobileStepItem index={3} />
          <Connector afterStep={4} className="flex-1" />
          <MobileStepItem index={4} />
        </div>
      </div>

      {/* Tablet & desktop — single row with connectors between all steps */}
      <div className="hidden md:block overflow-x-auto lg:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="grid w-full min-w-0 items-start"
          style={{
            gridTemplateColumns: "auto 1fr auto 1fr auto 1fr auto 1fr auto",
          }}
        >
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            return (
              <React.Fragment key={step}>
                <StepItem index={index} />
                {index < steps.length - 1 && (
                  <Connector afterStep={stepNumber} className="flex-1" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepper;
