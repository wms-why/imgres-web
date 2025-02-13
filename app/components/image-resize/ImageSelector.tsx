import Image from "next/image";
import { useRef, useState } from "react";

const aspectRatioTemplates = [
  {
    value: 1,
    label: "1:1",
  },
  {
    value: 16 / 9,
    label: "16:9",
  },
  {
    value: 9 / 16,
    label: "9:16",
  },
  {
    value: 21 / 9,
    label: "21:9",
  },
  {
    value: 9 / 21,
    label: "9:21",
  },
  {
    value: 4 / 3,
    label: "4:3",
  },
  {
    value: 3 / 4,
    label: "3:4",
  },
];

export interface ImageInfo {
  blob: Blob;
  width: number;
  height: number;
  aspectRatio: string;
  aspectRatioNumber: number;
  size: string;
}

export default function ImageSelect({ setImageInfo }: { setImageInfo: (info: ImageInfo) => void }) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [imageInfo, setCurrentImageInfo] = useState<ImageInfo | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const formatFileAspectRatio = (aspectRatio: number) => {
    for (const item of aspectRatioTemplates) {
      if (Math.abs(item.value - aspectRatio) < 0.001) {
        return item.label;
      }
    }
    return `${aspectRatio.toFixed(2)}:1`;
  };


  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        // Create an image element to get dimensions
        const img = document.createElement("img");
        img.onload = () => {
          const aspectRatio = img.width / img.height;

          const o = {
            image: img,
            blob: file,
            width: img.width,
            height: img.height,
            aspectRatio: formatFileAspectRatio(aspectRatio),
            aspectRatioNumber: aspectRatio,
            size: formatFileSize(file.size),
          };
          setCurrentImageInfo(o);
          setImageInfo(o);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (


    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleImageSelect}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
      >
        choose an image
      </button>

      {selectedImage && imageInfo && (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
          <Image
            src={selectedImage}
            alt="Selected"
            className=" h-auto rounded-lg shadow-lg"
            width={400}
            height={400 * imageInfo?.aspectRatioNumber}
          />
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p className="flex justify-between border-b pb-1">
              <span>Dimensions:</span>
              <span className="font-medium">
                {imageInfo?.width}px * {imageInfo?.height}px
              </span>
            </p>
            <p className="flex justify-between border-b pb-1">
              <span>Aspect Ratio:</span>
              <span className="font-medium">
                {imageInfo?.aspectRatio}
              </span>
            </p>
            <p className="flex justify-between border-b pb-1">
              <span>File Size:</span>
              <span className="font-medium">{imageInfo?.size}</span>
            </p>
          </div>
        </div>
      )}
    </div>

  )
}