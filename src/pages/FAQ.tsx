import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "What is Crowd2Capital?",
      answer: "A platform where companies can hire interns, freelancers, trainers, and full-time employees."
    },
    {
      question: "Is registration free?",
      answer: "Yes. Both Hirers and Hirees can register for free."
    },
    {
      question: "How does hiring work?",
      answer: "Hirers pay 20% upfront. The rest is released after job completion."
    },
    {
      question: "What if the hired person doesn't perform?",
      answer: "We offer up to 3 replacements (for jobs) and 1 (for interns)."
    },
    {
      question: "Is my information secure?",
      answer: "Yes. Firebase is used to securely store your data."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-[#4FD1C5]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Crowd2Capital
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {item.question}
                  </span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-[#4FD1C5]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#4FD1C5]" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-gradient-to-r from-[#4FD1C5] to-[#3db9af] rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6 opacity-90">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white text-[#4FD1C5] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/about"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-[#4FD1C5] transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 