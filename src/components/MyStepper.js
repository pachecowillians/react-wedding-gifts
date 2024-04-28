import React from "react";
import {
  Stack,
  Text,
  Step,
  StepIndicator,
  StepIcon,
  StepSeparator,
  StepStatus,
  Stepper,
} from "@chakra-ui/react";

const MyStepper = ({ activeStep, steps, activeStepText }) => {
  return (
    <Stack m="2em 0">
      <Stepper size="sm" colorScheme="facebook" index={activeStep} gap="0">
        {steps.map((step, index) => (
          <Step key={index} gap="0">
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: "0" }} />
          </Step>
        ))}
      </Stepper>
      <Text>
        Passo {activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
};

export default MyStepper;
