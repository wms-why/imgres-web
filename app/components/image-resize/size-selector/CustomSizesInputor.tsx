import { TrashIcon } from '@heroicons/react/24/outline';
import { ImageInfo } from '../ImageSelector';
import { Size, initSize, formatPixes, formatFreeTag, needAI, calcSize } from './defines';
import { useEffect, useState } from 'react';
import { ResizeMode } from '../ResizeModeSelector';
import { getCustomSizes } from '../cache';

export default function CustomSizesInput({ imageInfo, setInputCustomSizes: setInputCustomSizes, resizeMode }: { imageInfo: ImageInfo | null; setInputCustomSizes: (sizes: Size[]) => void; resizeMode: ResizeMode }) {
  const [customSizes, setCustomSizes] = useState<Size[]>([]);

  function onTagChange() {
    customSizes.forEach((e) => {
      const { width, height, scale } = calcSize(imageInfo, e.input, resizeMode);
      e.width = width;
      e.height = height;
      e.scale = scale;
      e.needAI = needAI(imageInfo, e);
      if (!e.needAI) {
        e.useAI = false;
      }
    });
    setCustomSizes([...customSizes]);
    setInputCustomSizes([...customSizes]);
  }

  useEffect(() => {
    onTagChange();
  }, [imageInfo, resizeMode]);

  const cacheSize = getCustomSizes();

  useEffect(() => {
    if (cacheSize) {
      const cs = [];

      for (let c of cacheSize) {
        let size = initSize(imageInfo, c.input, resizeMode);
        size.useAI = c.useAI;
        cs.push(size);
      }

      setCustomSizes(cs);
      setInputCustomSizes(cs);
    }
  }, [cacheSize]);

  return (
    <div className=''>
      <h3 className='text-lg font-medium'>
        Add Custom Sizes
        <button
          onClick={() => {
            const cs = [...customSizes, initSize(imageInfo, 1, resizeMode)];
            setCustomSizes(cs);
            setInputCustomSizes(cs);
          }}
          className='ml-5 w-32 px-2 py-2 mb-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors'>
          add
        </button>
      </h3>

      {customSizes.map((size, index) => (
        <div key={index} className='flex justify-around py-2'>
          <input
            type='number'
            value={size.input ? size.input : ''}
            onInput={(e) => {
              const inputValue = e.currentTarget.value;

              const value = inputValue ? parseInt(e.currentTarget.value) : 0;
              if (value > 2048) {
                e.currentTarget.setCustomValidity('Maximum size is 2048px');
                e.currentTarget.reportValidity();
                return;
              }
              e.currentTarget.setCustomValidity('');
              customSizes[index] = initSize(imageInfo, value, resizeMode);
              setCustomSizes([...customSizes]);
              setInputCustomSizes([...customSizes]);
            }}
            min='1'
            max='2048'
            className='w-96 px-4 py-2 border rounded-lg transition-all border-gray-300 hover:border-gray-400'
          />
          <div className='w-96 text-center'>{formatPixes(size)}</div>
          <div className='w-36 text-center'>{formatFreeTag(imageInfo, size, onTagChange, onTagChange)}</div>

          <TrashIcon
            onClick={() => {
              customSizes.splice(index, 1);
              setCustomSizes([...customSizes]);
              setInputCustomSizes([...customSizes]);
            }}
            className='h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer'
          />
        </div>
      ))}
    </div>
  );
}
