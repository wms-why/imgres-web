export type ResizeMode = "width" | "height";

export default function ResizeMode({ resizeMode, setResizeMode }: { resizeMode: ResizeMode, setResizeMode: (mode: ResizeMode) => void }) {

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Choose Axis</h3>
      <div className="flex gap-4">
        <button
          onClick={() => setResizeMode("width")}
          className={`px-4 py-2 rounded-full border ${resizeMode === "width"
            ? "bg-black text-white"
            : "border-gray-300 hover:border-gray-400"
            }`}
        >
          Depend On Width
        </button>
        <button
          onClick={() => setResizeMode("height")}
          className={`px-4 py-2 rounded-full border ${resizeMode === "height"
            ? "bg-black text-white"
            : "border-gray-300 hover:border-gray-400"
            }`}
        >
          Depend On Height
        </button>
      </div>
    </div>
  )
}
