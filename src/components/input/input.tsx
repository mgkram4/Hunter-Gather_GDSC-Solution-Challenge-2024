export interface InputProps {
  label?: string;
  type?: string | "text";
  name: string;
  className?: string;
  isRequired?: boolean;
}

export default function Input({
  label,
  type,
  name,
  className,
  isRequired,
}: InputProps) {
  return (
    <>
      <label className="block">
        {label}
        <input
          type={type}
          className={`mt-1 p-2 w-full rounded border-2 border-gray-200 ${className}`}
          name={name}
          required={isRequired}
        />
      </label>
    </>
  );
}
