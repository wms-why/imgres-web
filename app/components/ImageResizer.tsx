/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { resize, resizeFree } from "../api/resize";
import { loginStore } from "@/store/LoginStore";
import { costCredits } from "../api/login";
import { Size } from "./image-resize/size-selector/defines";
import ResizeModeSelector, { ResizeMode } from "./image-resize/ResizeModeSelector";
import ImageSelect, { ImageInfo } from "./image-resize/ImageSelector";
import DefaultSizesSelector from "./image-resize/size-selector/DefaultSizesSelector";
import CustomSizesInputor from "./image-resize/size-selector/CustomSizesInputor";
import { save as saveCache, getMode } from "./image-resize/cache";

export default function ImageResizer() {
  const [selectImageErrorShow, setSelectImageErrorShow] = useState(false);
  const [submitErrorShow, setSubmitErrorShow] = useState(false);
  const [submitErrorMsg, setSubmitErrorMsg] = useState("");

  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [resizeMode, setResizeMode] = useState<ResizeMode>("width");
  const [sizes, setSizes] = useState<Size[]>([]);
  const [customSizes, setCustomSizes] = useState<Size[]>([]);

  const handleSelectImage = (info: ImageInfo) => {
    setImageInfo(info);
    setSelectImageErrorShow(false);
  };

  const cacheResizeMode = getMode();

  useEffect(() => {
    let resizeModeStr = cacheResizeMode || "width";
    setResizeMode(resizeModeStr);
  }, [cacheResizeMode])

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

    const total = [...sizes, ...customSizes].map(e => ({ "scale": e.scale, "use_ai": e.needAI && e.useAI }));

    saveCache(resizeMode, sizes, customSizes);

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

          <ImageSelect setImageInfo={handleSelectImage} />

          {/* Resize Mode Selection */}

          <ResizeModeSelector resizeMode={resizeMode} setResizeMode={setResizeMode} />

          {/* Size Selection */}
          <DefaultSizesSelector imageInfo={imageInfo} setSelectedSizes={setSizes} resizeMode={resizeMode} />

          {/* custom Size Selection */}
          <CustomSizesInputor imageInfo={imageInfo} setInputCustomSizes={setCustomSizes} resizeMode={resizeMode} />

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
