/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { resizeByAlgorithm } from "../utils/resize";
import Image from "next/image";

interface Size {
  input: number;
  width: number;
  height: number;
  imgSrc: string;
  needAI: boolean;
  useAI: boolean;
}

interface DefaultSize extends Size {
  selected: boolean;
}

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

const sizeTemplates = [24, 32, 48, 64, 96, 128, 256, 512].map((e) => ({
  input: e,
  width: 0,
  height: 0,
  imgSrc: "",
  needAI: false,
  useAI: false,
  selected: false,
}));

const ImageResizer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectImageErrorShow, setSelectImageErrorShow] = useState(false);
  const [resizeMode, setResizeMode] = useState<"width" | "height">("width");
  const [sizes, setSizes] = useState<DefaultSize[]>(sizeTemplates);
  const [customSizes, setCustomSizes] = useState<Size[]>([]);
  const [imageInfo, setImageInfo] = useState<{
    blob: Blob;
    width: number;
    height: number;
    aspectRatio: string;
    aspectRatioNumber: number;
    size: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const calcSize = (size: number) => {
    if (!imageInfo) {
      return { width: 0, height: 0 };
    }

    const aps = imageInfo?.aspectRatioNumber;
    if (resizeMode == "width") {
      return { width: size, height: size / aps };
    } else {
      return { width: size * aps, height: size };
    }
  };
  const initSize = (size: number) => {
    const { width, height } = calcSize(size);
    const s = {
      input: size,
      width,
      height,
      needAI: Boolean(false),
      useAI: false,
      imgSrc: "",
    } satisfies Size;

    s.needAI = needAI(s);

    return s;
  };

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

  const formatPixes = (size: Size) => {
    if (size.width == 0 || size.height == 0) {
      return "";
    }

    return (
      <span className="text-gray-500">
        {`${size.width.toFixed(0)} * ${size.height.toFixed(0)}`}px
      </span>
    );
  };

  const formatFreeTag = (size: Size) => {
    if (!imageInfo) {
      return "";
    }
    if (!size.needAI) {
      return (
        <span
          className="text-green-500"
          title="your chooesed pixes is lower then your upload image's pixes"
        >
          free
        </span>
      );
    } else {
      if (size.useAI) {
        return (
          <>
            <span className="text-green-500 text-xl font-bold">AI</span> |{" "}
            <span
              className="text-gray-500 cursor-pointer text-xl font-bold"
              title="you can click to toogle AI to resize it to your choosed size"
              onClick={() => {
                size.useAI = false;
                freshSizesDisplay();
              }}
            >
              free
            </span>
          </>
        );
      } else {
        return (
          <>
            <span
              className="text-gray-500 cursor-pointer text-xl font-bold"
              title="you can click to toogle free to resize it to your choosed size"
              onClick={() => {
                size.useAI = true;
                freshSizesDisplay();
              }}
            >
              AI
            </span>{" "}
            | <span className="text-green-500 text-xl font-bold">free</span>
          </>
        );
      }
    }
  };

  const needAI = (size: Size) => {
    if (!imageInfo) {
      return false;
    }

    return size.width > imageInfo?.width || size.height > imageInfo?.height;
  };
  const freshSizesDisplay = () => {
    sizes.forEach((e) => {
      const { width, height } = calcSize(e.input);
      e.width = width;
      e.height = height;

      e.needAI = needAI(e);

      if (!e.needAI) {
        e.useAI = false;
      }
    });
    setSizes([...sizes]);

    customSizes.forEach((e) => {
      const { width, height } = calcSize(e.input);
      e.width = width;
      e.height = height;
      e.needAI = needAI(e);
      if (!needAI(e)) {
        e.useAI = false;
      }
    });

    setCustomSizes([...customSizes]);
  };

  useEffect(() => {
    freshSizesDisplay();

    return () => {};
  }, [imageInfo, resizeMode]);

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
            blob: file,
            width: img.width,
            height: img.height,
            aspectRatio: formatFileAspectRatio(aspectRatio),
            aspectRatioNumber: aspectRatio,
            size: formatFileSize(file.size),
          };
          setImageInfo(o);
          setSelectImageErrorShow(false);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async () => {
    if (!imageInfo) {
      setSelectImageErrorShow(true);

      return;
    }

    // const b = imageInfo?.blob!;

    // Promise.all(sizes.map(async e => {
    //   const url = await resizeByAlgorithm(b, e.width, e.height);
    //   e.imgSrc = url;
    // }))

    console.log(sizes);
    console.log(customSizes);
  };

  return (
    <section className="w-full py-16 bg-gray-100">
      <div className="max-w-[1024px] mx-auto ">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Image Resize Tool
        </h2>
        <div className="flex flex-col gap-8">
          {/* Image Selection */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="image/*"
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
              <div className="w-full max-w-xl">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-lg shadow-lg"
                  width={imageInfo?.width}
                  height={imageInfo?.height}
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

          {/* Resize Mode Selection */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Choose Axis</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setResizeMode("width")}
                className={`px-4 py-2 rounded-full border ${
                  resizeMode === "width"
                    ? "bg-black text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Depend On Width
              </button>
              <button
                onClick={() => setResizeMode("height")}
                className={`px-4 py-2 rounded-full border ${
                  resizeMode === "height"
                    ? "bg-black text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                Depend On Height
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Choose Target Sizes</h3>
            {sizes.map((size: DefaultSize) => (
              <div className="flex justify-around" key={size.input}>
                <button
                  onClick={() => {
                    size.selected = !size.selected;
                    setSizes([...sizes]);
                  }}
                  className={`w-96 px-4 py-2 border rounded-lg transition-all ${
                    size.selected
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {`${size.input}px`}
                </button>

                <div>{formatPixes(size)}</div>
                <div>{formatFreeTag(size)}</div>
              </div>
            ))}
          </div>
          {/* custom Size Selection */}

          <div className="">
            <h3 className="text-lg font-medium">
              Add Custom Sizes
              <button
                onClick={() => {
                  setCustomSizes([...customSizes, initSize(1)]);
                }}
                className="ml-5 w-32 px-2 py-2 mb-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                add
              </button>
            </h3>

            {customSizes.map((size, index) => (
              <div key={index} className="flex justify-around ">
                <button
                  onClick={() => {
                    customSizes.splice(index, 1);
                    setCustomSizes([...customSizes]);
                  }}
                  className="px-4 py-2 border rounded-lg transition-all border-gray-300 hover:border-gray-400"
                >
                  remove
                </button>
                <input
                  type="number"
                  value={size.input}
                  onInput={(e) => {
                    const value = parseInt(e.currentTarget.value);
                    if (value > 2048) {
                      e.currentTarget.setCustomValidity(
                        "Maximum size is 2048px"
                      );
                      e.currentTarget.reportValidity();
                      return;
                    }
                    e.currentTarget.setCustomValidity("");
                    customSizes[index] = initSize(value);
                    setCustomSizes([...customSizes]);
                  }}
                  min="1"
                  max="2048"
                  className="w-96 px-4 py-2 border rounded-lg transition-all border-gray-300 hover:border-gray-400"
                />
                <div>{formatPixes(size)}</div>
                <div>{formatFreeTag(size)}</div>
              </div>
            ))}
          </div>

          {/* Execute Button */}
          <button
            onClick={submit}
            className="w-full sm:w-auto px-8 py-4 text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Start Process
          </button>
          {selectImageErrorShow && (
            <div className="text-red-500 text-xl text-center">
              please upload an image first
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageResizer;
