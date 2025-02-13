import { ImageInfo } from "../ImageSelector";
import { ResizeMode } from "../ResizeModeSelector";

export interface Size {
  input: number;
  scale: number;
  width: number;
  height: number;
  needAI: boolean;
  useAI: boolean;
}


export const formatPixes = (size: Size) => {
  if (size.width == 0 || size.height == 0) {
    return "";
  }

  return (
    <span className="text-gray-500">
      {`${size.width.toFixed(0)} * ${size.height.toFixed(0)}`}px
    </span>
  );
};

export const formatFreeTag = (imageInfo: ImageInfo | null, size: Size, onFreeClick: (() => void) | undefined, onAIClick: (() => void) | undefined) => {
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

              onFreeClick && onFreeClick();
              // freshSizesDisplay();
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
              onAIClick && onAIClick();

              // freshSizesDisplay();
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


export const calcSize = (imageInfo: ImageInfo | null, size: number, resizeMode: ResizeMode) => {
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

export const needAI = (imageInfo: ImageInfo | null, size: Size) => {
  if (!imageInfo) {
    return false;
  }

  return size.width > imageInfo?.width || size.height > imageInfo?.height;
};
export const initSize = (imageInfo: ImageInfo | null, size: number, resizeMode: ResizeMode) => {

  const { width, height, scale } = calcSize(imageInfo, size, resizeMode);
  const s = {
    input: size,
    scale,
    width,
    height,
    needAI: Boolean(false),
    useAI: Boolean(false),
  } satisfies Size;

  s.needAI = needAI(imageInfo, s);

  return s;
};
