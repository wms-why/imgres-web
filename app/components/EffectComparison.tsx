import Image from 'next/image'
export default function EffectComparison() {


  const imageSize = 400;

  return (

    <section id="EffectComparison" className="py-24 space-y-8 w-full">
      <h2 className="text-3xl font-bold text-center mb-8">Image Quality Comparison</h2>
      <div className="flex justify-around gap-8">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/img/girl@200_200.jpg"
            alt="an original girl picture with resolution 200*200"
            width={imageSize}
            height={imageSize}
            className="rounded-lg mb-4"
          />
          <div className="text-lg font-medium text-gray-700">Original Picture</div>
          <div className="text-sm text-gray-500">200x200 resolution</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/img/girl@800_800_alg.jpg"
            alt="an original girl picture with resolution 800*800, which generated by algorithm"
            width={imageSize}
            height={imageSize}
            className="rounded-lg mb-4"
          />
          <div className="text-lg font-medium text-gray-700">Algorithm Upscaled</div>
          <div className="text-sm text-gray-500">800x800 resolution (Free)</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/img/girl@800_800_ai.jpg"
            alt="an original girl picture with resolution 800*800, which generated by AI"
            width={imageSize}
            height={imageSize}
            className="rounded-lg mb-4"
          />
          <div className="text-lg font-medium text-gray-700">AI Upscaled</div>
          <div className="text-sm text-gray-500">800x800 resolution</div>
        </div>
      </div>
    </section>

  )
}