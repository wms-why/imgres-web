import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const faqs = [
    {
      question: 'Features of Our AI Image Generator',
      answer: [
        'First, we provide a service of one image resize to multiple resolutions.',
        'Second, we provide a free algorithm handler and AI handler.',
        'Last, the sizes you choose and input, will be recoverd when you open the site at next time.']
    },
    {
      question: 'How to use our Image Resize Tool?',
      answer: 'You can upload an image and choose the resolution you want. Then click the "Start Image Resize" button to start the process. If you need higher quality, you can choose AI to process image resize.'
    },
    {
      question: 'Why Use Our Image Resize Tool?',
      answer: 'We provide a free algorithm handler and AI handler. And you can choose or input resolutions once, then resize many images ever.'
    },
    {
      question: 'how to upscale images without losing quality?',
      answer: 'You can use our image resizer to upscale images without losing quality.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support all major image formats including JPG, PNG, WebP, and more in future.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'no, but the max resolution is 2048px.'
    },
    {
      question: 'How is the image quality preserved when resizing?',
      answer: 'We use advanced algorithms to maintain image quality while optimizing file size. And if you choose AI, you can get higher quality improvements.'
    },
    {
      question: 'If I have some questions, where can I ask them?',
      answer: 'We have telegram group for support.',
      link: 'https://t.me/+W1kcVrb-cQU5NWFh'
    },
  ];

  return (
    <section id="faq" className="w-full py-24 bg-gray-50">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Frequently Asked Questions About Image Resize
        </h2>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </div>
              {Array.isArray(faq.answer) ? (
                faq.answer.map((answer, index) => (
                  <p key={index} className="mt-2 text-gray-600">{answer}</p>
                ))
              ) : (<p key={index} className="mt-2 text-gray-600">{faq.answer}</p>)}

              {faq.link && (
                <a href={faq.link} target='_blank' rel="noreferrer" className="text-blue-500 hover:underline mt-2 block" >
                  {faq.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
