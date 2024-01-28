export enum BUTTON_VARIANTS {
  NAVBAR = "block text-white  hover:bg-green-700 p-2 rounded-xl bg-green-600",
  PRIMARY = "bg-primary text-white p-2 rounded hover:bg-opacity-90 cursor-pointer w-full",
}

export interface ButtonProps {
  children?: React.ReactNode;
  varient?: BUTTON_VARIANTS;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  varient,
  className,
  type,
  disabled,
}: ButtonProps) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`${varient} ${className}`}
      >
        {children}
      </button>
    </>
  );
}
