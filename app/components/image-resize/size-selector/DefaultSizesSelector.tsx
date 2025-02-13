import { useEffect, useState } from "react";
import { ImageInfo } from "../ImageSelector";
import { Size, needAI, formatPixes, formatFreeTag, calcSize } from "./defines";
import { ResizeMode } from "../ResizeModeSelector";
import { getSizes } from "../cache";

interface DefaultSize extends Size {
  selected: boolean;
}


export default function DefaultSizesSelector({ imageInfo, setSelectedSizes, resizeMode }: { imageInfo: ImageInfo | null, setSelectedSizes: (sizes: Size[]) => void, resizeMode: ResizeMode }) {

  const sizeTemplates = [24, 32, 48, 64, 96, 128, 256, 512].map((e) => ({
    input: e,
    scale: 0,
    width: 0,
    height: 0,
    needAI: false,
    useAI: false,
    selected: false,
  }));

  const [sizes, setSizes] = useState<DefaultSize[]>(sizeTemplates);

  function onTagChange() {
    sizes.forEach((e) => {
      const { width, height, scale } = calcSize(imageInfo, e.input, resizeMode);
      e.width = width;
      e.height = height;
      e.scale = scale;
      e.needAI = needAI(imageInfo, e);
      if (!e.needAI) {
        e.useAI = false;
      }
    });
    setSizes([...sizes]);

    const selectedList = sizes.filter(e => e.selected);
    setSelectedSizes(selectedList);
  }

  useEffect(() => {
    onTagChange();
  }, [imageInfo, resizeMode]);


  const cacheSize = getSizes();

  useEffect(() => {

    if (cacheSize) {
      let sizeTs = [...sizeTemplates];
      for (let c of cacheSize) {
        for (let s of sizeTs) {
          if (c.input == s.input) {
            s.selected = true;
            s.useAI = c.useAI;
            break;
          }
        }
      }
      setSizes([...sizes]);

      const selectedList = sizes.filter(e => e.selected);
      setSelectedSizes(selectedList);
    }

  }, [cacheSize])

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Choose Target Sizes</h3>
      {sizes.map((size: DefaultSize) => (
        <div className="flex justify-around" key={size.input}>
          <button
            onClick={() => {
              size.selected = !size.selected;

              const newSizes = [...sizes];
              setSizes(newSizes);
              setSelectedSizes(newSizes);
            }}
            className={`w-96 px-4 py-2 border rounded-lg transition-all ${size.selected
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-gray-400"
              }`}
          >
            {`${size.input}px`}
          </button>

          <div className="w-96 text-center">{formatPixes(size)}</div>

          <div className="w-36 text-center">{formatFreeTag(imageInfo, size, onTagChange, onTagChange)}</div>
          <div className="h-6 w-6 "></div>
        </div>
      ))}
    </div>
  )
}
