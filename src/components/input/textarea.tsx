import { useState } from "react";
import Markdown from "react-markdown";

interface TextareaProps {
  label?: string;
  name: string;
  className?: string;
  labelClassName?: string;
  isRequired?: boolean;
  showPreview?: boolean;
}

export default function Textarea({
  label,
  name,
  className,
  labelClassName,
  isRequired,
  showPreview,
}: TextareaProps) {
  const [preview, setPreview] = useState("");
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
            onChange={(e) => setPreview(e.target.value)}
          />
          {showPreview && (
            <div className={"mt-1 p-2 rounded border-2 border-gray-200 w-1/2"}>
              <Markdown className={"markdown"}>{preview}</Markdown>
            </div>
          )}
        </div>
      </label>
    </>
  );
}
