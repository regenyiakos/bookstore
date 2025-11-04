import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

/**
 * FAQ Section
 * Displays frequently asked questions with collapsible answers
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are your shipping options?',
      answer:
        'We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free standard shipping is available for orders over $50.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Once your order ships, you\'ll receive a tracking number via email. You can also track your order from your account dashboard under "Order History".',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 30 days of purchase. Books must be in original condition with no damage. To initiate a return, please contact our support team.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer:
        'Yes! We offer complimentary gift wrapping for all orders. You can select this option at checkout and add a personalized message.',
    },
    {
      question: 'Can I cancel or modify my order?',
      answer:
        'You can cancel or modify your order within 2 hours of placing it. After that, orders are processed and cannot be changed. Please contact us immediately if you need assistance.',
    },
    {
      question: 'Do you have a physical store?',
      answer:
        'Yes, we have a physical bookstore located at 1234 Book Street, Literature City. Visit us Monday through Saturday for in-person browsing and events.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaQuestionCircle className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-600 flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@bookstore.com"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact our support team
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
