import Hero from './components/Hero';
import FAQ from './components/FAQ';
import ImageResizer from './components/ImageResizer';
import EffectComparison from './components/EffectComparison';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <Hero />
        <ImageResizer />

        <EffectComparison />
        <FAQ />
      </main>
    </div>
  );
}
