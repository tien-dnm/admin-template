import React from "react";
const PrimaryButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn text-white bg-primary hover:bg-primary-800 active:bg-primary-900 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const SecondaryButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn  text-white bg-secondary hover:bg-secondary-700 active:bg-secondary-800 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};

const DangerButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn text-white bg-danger hover:bg-danger-700 active:bg-danger-800 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const WarningButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn text-black bg-warning hover:bg-warning-600 active:bg-warning-700 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const SuccessButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn text-white bg-success hover:bg-success-700 active:bg-success-800 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const InfoButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn text-white bg-info hover:bg-info-700 active:bg-info-800 ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const PrimaryOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-primary-700 border-primary-700  hover:bg-primary-800 active:bg-primary-900 hover:text-white  ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const SecondaryOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-secondary-700 border-secondary-700  hover:bg-secondary-600 active:bg-secondary-700 hover:text-white ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const DangerOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-danger-700 border-danger-700  hover:bg-danger-600 active:bg-danger-700 hover:text-white ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const WarningOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-warning-500 border-warning-500  hover:bg-warning-600 active:bg-warning-700 hover:text-black ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};

const InfoOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-info-700 border-info-700  hover:bg-info-700 active:bg-info-800 hover:text-white ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};
const SuccessOutlineButton = ({
  className = "",
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`custom-btn border bg-transparent text-success-700 border-success-700  hover:bg-success-700 active:bg-success-800 hover:text-white ${className}`}
    >
      <div className="flex justify-center items-center gap-0.5">{children}</div>
    </button>
  );
};

const buttonConfig = [
  {
    color: "primary",
    button: [
      {
        outline: false,
        Element: PrimaryButton,
      },
      {
        outline: true,
        Element: PrimaryOutlineButton,
      },
    ],
  },
  {
    color: "secondary",
    button: [
      {
        outline: false,
        Element: SecondaryButton,
      },
      {
        outline: true,
        Element: SecondaryOutlineButton,
      },
    ],
  },
  {
    color: "warning",
    button: [
      {
        outline: false,
        Element: WarningButton,
      },
      {
        outline: true,
        Element: WarningOutlineButton,
      },
    ],
  },
  {
    color: "danger",
    button: [
      {
        outline: false,
        Element: DangerButton,
      },
      {
        outline: true,
        Element: DangerOutlineButton,
      },
    ],
  },
  {
    color: "info",
    button: [
      {
        outline: false,
        Element: InfoButton,
      },
      {
        outline: true,
        Element: InfoOutlineButton,
      },
    ],
  },
  {
    color: "success",
    button: [
      {
        outline: false,
        Element: SuccessButton,
      },
      {
        outline: true,
        Element: SuccessOutlineButton,
      },
    ],
  },
];
export const Button = ({
  children,
  onClick,
  className = "",
  color = "primary",
  disabled = false,
  outline = false,
  ...props
}) => {
  const Element = buttonConfig
    .find((x) => x.color === color)
    .button.find((x) => x.outline === outline).Element;
  return (
    <Element
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </Element>
  );
};
