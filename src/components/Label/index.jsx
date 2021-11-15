import React from "react";

export const Label = ({ text, bold }) => {
  const className = bold ? "appointment-resume bold" : "appointment-resume";
  return (
    <div data-testid="label" className={className}>
      {text}
    </div>
  );
};
