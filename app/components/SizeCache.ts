"use client";

import { useEffect, useState } from "react";

interface Size {
  input: number;
  useAI: boolean;
}

const resizeModeKey = "resizeModeKey";
const sizeKey = "sizeKey";
const customSizeKey = "customSizeKey";

export function save(
  resizeMode: "width" | "height" | null,
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

export function get(): {
  resizeMode: "width" | "height" | null;
  sizes: Size[];
  customSizes: Size[];
} {
  const [resizeMode, setResizeMode] = useState<"width" | "height" | null>(null);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [customSizes, setCustomSizes] = useState<Size[]>([]);

  useEffect(() => {
    let resizeMode = localStorage?.getItem(resizeModeKey);
    if (resizeMode != "width" && resizeMode != "height") {
      resizeMode = null;
    }
    setResizeMode(resizeMode);

    let sizesStr = localStorage?.getItem(sizeKey);
    const sizes = sizesStr ? JSON.parse(sizesStr) : [];
    setSizes(sizes);
    let customSizesStr = localStorage?.getItem(customSizeKey);
    const customSizes = customSizesStr ? JSON.parse(customSizesStr) : [];
    setCustomSizes(customSizes);
  }, []);

  return {
    resizeMode,
    sizes,
    customSizes,
  };
}
