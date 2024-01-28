import { useState } from "react";
import Markdown from "react-markdown";

interface TextareaProps {
  label?: string;
  name: string;
  className?: string;
  labelClassName?: string;
  isRequired?: boolean;
  showPreview?: boolean;
  error?: string | null;
  setFieldValue?: (field: string, value: string) => void;
}

export default function Textarea({
  label,
  name,
  className,
  labelClassName,
  isRequired,
  showPreview,
  error,
  setFieldValue,
}: TextareaProps) {
  const [preview, setPreview] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreview(e.target.value);
    setFieldValue && setFieldValue(name, e.target.value);
  };
  return (
    <>
      <label className="block">
        <div className="flex">
          <p className={`${labelClassName} w-1/2`}>{label}</p>
          {showPreview && (
            <p className={`${labelClassName} w-1/2`}>Markdown Preview</p>
          )}
        </div>
        <div className="flex h-fit">
          <textarea
            className={`mt-1 p-2 ${
              showPreview ? "w-1/2" : "w-full"
            } rounded border-2 border-gray-200 ${className}`}
            name={name}
            required={isRequired}
            onChange={handleChange}
          />
          {showPreview && (
            <div className={"mt-1 p-2 rounded border-2 border-gray-200 w-1/2"}>
              <Markdown className={"markdown"}>{preview}</Markdown>
            </div>
          )}
        </div>
      </label>
      {error && <span className="font-bold text-red-500 p-2">{error}</span>}
    </>
  );
}
