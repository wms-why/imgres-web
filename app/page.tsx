import Hero from './components/Hero';
import FAQ from './components/FAQ';
import ImageResizer from './components/ImageResizer';
import { UseBoundStore } from 'zustand/react';
import { Store } from './Context';
import { StoreApi } from 'zustand';

export default function Home({ useStore }: {
  useStore: UseBoundStore<StoreApi<Store>>
}) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <Hero />
        <ImageResizer useStore={useStore} />
        <FAQ />
      </main>
    </div>
  );
}
