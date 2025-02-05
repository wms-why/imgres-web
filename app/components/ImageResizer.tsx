/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { resize, resizeFree } from "../api/resize";
import { loginStore } from "@/store/LoginStore";
import { save as saveCache, get as getCache } from "./SizeCache";
import { costCredits } from "../api/login";

interface Size {
  input: number;
  scale: number;
  width: number;
  height: number;
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
  scale: 0,
  width: 0,
  height: 0,
  needAI: false,
  useAI: false,
  selected: false,
}));

const ImageResizer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectImageErrorShow, setSelectImageErrorShow] = useState(false);
  const [submitErrorShow, setSubmitErrorShow] = useState(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState("");
  const [imageInfo, setImageInfo] = useState<{
    blob: Blob;
    width: number;
    height: number;
    aspectRatio: string;
    aspectRatioNumber: number;
    size: string;
  } | null>(null);
  const [resizeMode, setResizeMode] = useState<"width" | "height">('width');
  const [sizes, setSizes] = useState<DefaultSize[]>(sizeTemplates);
  const [customSizes, setCustomSizes] = useState<Size[]>([]);

  const calcSize = (size: number) => {
    if (!imageInfo) {
      return { width: 0, height: 0, scale: 0 };
    }

    const aps = imageInfo?.aspectRatioNumber;
    if (resizeMode == "width") {
      return { width: size, height: size / aps, scale: size / imageInfo.width };
    } else {
      return { width: size * aps, height: size, scale: size / imageInfo.height };
    }
  };

  const initSize = (size: number) => {

    const { width, height, scale } = calcSize(size);
    const s = {
      input: size,
      scale,
      width,
      height,
      needAI: Boolean(false),
      useAI: Boolean(false),
    } satisfies Size;

    s.needAI = needAI(s);

    return s;
  };
  const needAI = (size: Size) => {
    if (!imageInfo) {
      return false;
    }

    return size.width > imageInfo?.width || size.height > imageInfo?.height;
  };

  const sizeCache = getCache();

  useEffect(() => {
    let resizeModeStr = sizeCache.resizeMode ? sizeCache.resizeMode : "width";
    setResizeMode(resizeModeStr);
  }, [sizeCache.resizeMode])

  useEffect(() => {

    if (sizeCache.sizes) {
      let sizeTs = [...sizeTemplates];
      for (let c of sizeCache.sizes) {
        for (let s of sizeTs) {
          if (c.input == s.input) {
            s.selected = true;
            s.useAI = c.useAI;
            break;
          }
        }
      }
      setSizes(sizeTs);
    }

  }, [sizeCache.resizeMode])

  useEffect(() => {


    if (sizeCache.customSizes) {
      const cs = [];

      for (let c of sizeCache.customSizes) {
        let size = initSize(c.input);
        size.useAI = c.useAI;
        cs.push(size);
      }

      setCustomSizes(cs);

    }
  }, [sizeCache.customSizes])



  const fileInputRef = useRef<HTMLInputElement>(null);

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
          title="image resize with lower resolution is always free"
        >
          free
        </span>
      );
    } else {
      if (size.useAI) {
        return (
          <>
            <span className="text-green-500  font-bold" title="use AI to resize image with this size">AI</span>{" | "}
            <span
              className="text-gray-500 cursor-pointer  font-bold"
              title="use Algorithm to resize image with this size (free)"
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
              className="text-gray-500 cursor-pointer font-bold"
              title="use AI to resize image with this size"
              onClick={() => {
                size.useAI = true;
                freshSizesDisplay();
              }}
            >
              AI
            </span>
            {" | "}
            <span className="text-green-500  font-bold"
              title="use Algorithm to resize image with this size (free)"
            >free</span>
          </>
        );
      }
    }
  };


  const freshSizesDisplay = () => {
    sizes.forEach((e) => {
      const { width, height, scale } = calcSize(e.input);
      e.width = width;
      e.height = height;
      e.scale = scale;
      e.needAI = needAI(e);
      if (!e.needAI) {
        e.useAI = false;
      }
    });
    setSizes([...sizes]);

    customSizes.forEach((e) => {
      const { width, height, scale } = calcSize(e.input);
      e.width = width;
      e.height = height;
      e.scale = scale;
      e.needAI = needAI(e);
      if (!needAI(e)) {
        e.useAI = false;
      }
    });

    setCustomSizes([...customSizes]);
  };

  useEffect(() => {
    freshSizesDisplay();

    return () => { };
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
            image: img,
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

  const { setShowLoginPanel, userInfo, setUserInfo } = loginStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setSubmitErrorShow(false);

    if (!imageInfo) {
      setSelectImageErrorShow(true);
      setIsSubmitting(false);
      return;
    }

    const b = imageInfo?.blob;

    const total = [...sizes.filter((e) => e.selected), ...customSizes].map(e => ({ "scale": e.scale, "use_ai": e.needAI && e.useAI }));

    saveCache(resizeMode, sizes.filter((e) => e.selected), customSizes);

    let allfree = true;
    total.forEach(e => {
      if (e.use_ai) {
        allfree = false;
      }
    });

    const res = allfree ? await resizeFree(b, imageInfo.width, imageInfo.height, total) : await resize(b, imageInfo.width, imageInfo.height, total);

    if (res.status == 200) {
      // 下载zip文件
      res.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = new Date();
        a.download = `images-${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.zip`;
        a.click();
        window.URL.revokeObjectURL(url);

        if (!allfree && userInfo) {
          const useAICount = total.filter(e => e.use_ai).length;
          costCredits(userInfo, setUserInfo, useAICount);
        }

      });
    } else {

      if (res.status == 401) {
        setShowLoginPanel(true);
      } else if (res.status == 451) {
        setSubmitErrorShow(true);
        res.text().then(r => {
          setSubmitErrorMsg(r);
        })
      } else {
        setSubmitErrorShow(true);
        res.text().then(r => {
          console.error(`Image Process Error, status = ${res.status}, message = ${r}`);
        })
      }
    }
    setIsSubmitting(false);

  };

  return (
    <section id="tool" className="w-full py-16 bg-gray-100">
      <div className="max-w-[1024px] mx-auto ">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Image Resize Tool
        </h2>
        <div className="flex flex-col gap-8">
          {/* Image Selection */}
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
              <div className="w-full max-w-xl">
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

          {/* Resize Mode Selection */}
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
                  className={`w-96 px-4 py-2 border rounded-lg transition-all ${size.selected
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {`${size.input}px`}
                </button>

                <div className="w-96 text-center">{formatPixes(size)}</div>
                <div className="w-36 text-center">{formatFreeTag(size)}</div>
                <div className="h-6 w-6 "></div>
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
              <div key={index} className="flex justify-around py-2">
                <input
                  type="number"
                  value={size.input ? size.input : ""}
                  onInput={(e) => {

                    const inputValue = e.currentTarget.value;

                    const value = inputValue ? parseInt(e.currentTarget.value) : 0;
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
                <div className="w-96 text-center">{formatPixes(size)}</div>
                <div className="w-36 text-center">{formatFreeTag(size)}</div>

                <TrashIcon
                  onClick={() => {
                    customSizes.splice(index, 1);
                    setCustomSizes([...customSizes]);
                  }}
                  className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Execute Button */}
          <button
            onClick={submit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Start Image Resize ( AI Temporarily Free )"
            )}
          </button>


          <div className="w-full sm:w-auto text-center text-stone-400">* AI need login, and cost your credit. One Credit for Once AI Process</div>
          {selectImageErrorShow && (
            <div className="text-red-500 text-xl text-center">
              please upload an image first
            </div>
          )}

          {submitErrorShow && submitErrorMsg && (
            <div className="text-red-500 text-xl text-center">
              {submitErrorMsg}
            </div>
          )}

          {submitErrorShow && !submitErrorMsg && (
            <div className="text-red-500 text-xl text-center">
              Image Resize Error, Please Contact Our Team
            </div>
          )}


        </div>
      </div>
    </section>
  );
};

export default ImageResizer;
