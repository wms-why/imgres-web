
import { useState } from "react"
import { ALL_INPUT_FORMAT, ALL_OUTPUT_FORMAT } from "./define";

export default function ImageFormatSelector({
  value,
  type,
  onChange,
}: Readonly<{
  value: string;
  type: "input" | "output";
  onChange: (value: string) => void;
}>) {

  const allFormats = type === "input" ? ALL_INPUT_FORMAT : ALL_OUTPUT_FORMAT;
  let defaultValue = allFormats[0];

  const inputValue = allFormats.filter(e => e === value);
  if (inputValue.length) {
    defaultValue = inputValue[0];
  }

  const [selectedFormat, setFormat] = useState(defaultValue);

  const clickFormat = (format: string) => {
    setFormat(format);
    onChange(format);
  }


  return (
    <div className="space-y-4">
      {allFormats.map((format) => (
        <label
          key={format}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedFormat === format ? 'border-primary' : 'border-gray-200'
            }`}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="subscription"
              value={format}
              checked={selectedFormat === format}
              onChange={(e) => clickFormat(e.target.value)}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
          </div>
        </label>
      ))}
    </div>
  )
}