"use client";

import { useEffect, useState } from "react";
import { ResizeMode } from "./ResizeModeSelector";

interface Size {
  input: number;
  useAI: boolean;
}

const resizeModeKey = "resizeModeKey";
const sizeKey = "sizeKey";
const customSizeKey = "customSizeKey";

export function save(
  resizeMode: ResizeMode,
  sizes: Size[],
  customSizes: Size[]
) {
  if (resizeMode) {
    localStorage?.setItem(resizeModeKey, resizeMode);
  }
  if (sizes) {
    localStorage?.setItem(sizeKey, JSON.stringify(sizes));
  }

  if (customSizes) {
    localStorage?.setItem(customSizeKey, JSON.stringify(customSizes));
  }
}
export const getMode = () => {
  const [resizeMode, setResizeMode] = useState<ResizeMode | null>(null);

  useEffect(() => {
    let resizeMode = localStorage?.getItem(resizeModeKey);
    if (resizeMode != "width" && resizeMode != "height") {
      resizeMode = null;
    }
    setResizeMode(resizeMode);
  }, []);

  return resizeMode;
};

export function getSizes() {
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    let sizesStr = localStorage?.getItem(sizeKey);
    const sizes = sizesStr ? JSON.parse(sizesStr) : [];
    setSizes(sizes);
  }, []);

  return sizes;
}

export function getCustomSizes() {
  const [customSizes, setCustomSizes] = useState<Size[]>([]);

  useEffect(() => {
    let customSizesStr = localStorage?.getItem(customSizeKey);
    const customSizes = customSizesStr ? JSON.parse(customSizesStr) : [];
    setCustomSizes(customSizes);
  }, []);

  return customSizes;
}
