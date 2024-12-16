import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const faqs = [
    {
      question: 'how to upscale images without losing quality?',
      answer: 'You can use our image resizer to upscale images without losing quality.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support all major image formats including JPG, PNG, WebP, and more.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Yes, the maximum file size is 10MB per image.'
    },
    {
      question: 'How is the image quality preserved?',
      answer: 'We use advanced algorithms to maintain image quality while optimizing file size. And if you choose AI, you can get higher quality improvements.'
    }
  ];

  return (
    <section id="faq" className="w-full py-24 bg-gray-50">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </div>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
