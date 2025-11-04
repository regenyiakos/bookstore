import { HiEnvelope, HiLifebuoy, HiChatBubbleLeftRight } from 'react-icons/hi2';

/**
 * Contact Section Component
 * Displays contact information and support options
 */
const contactMethods = [
  {
    id: 1,
    icon: HiEnvelope,
    title: 'Email Us',
    description: 'Get in touch with our team',
    value: 'support@bookstore.com',
    href: 'mailto:support@bookstore.com',
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  },
  {
    id: 2,
    icon: HiLifebuoy,
    title: 'Help Center',
    description: 'Find answers to common questions',
    value: 'Visit Help Center',
    href: '/help',
    color: 'bg-green-50 text-green-600 hover:bg-green-100',
  },
  {
    id: 3,
    icon: HiChatBubbleLeftRight,
    title: 'Live Chat',
    description: 'Chat with our support team',
    value: 'Start a conversation',
    href: '#chat',
    color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  },
];

export default function ContactSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method) => (
            <a
              key={method.id}
              href={method.href}
              className="group block bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-colors duration-300 ${method.color}`}>
                <method.icon className="w-7 h-7" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                {method.title}
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                {method.description}
              </p>
              <div className="text-base font-semibold text-amber-600 group-hover:text-amber-700 transition-colors duration-300">
                {method.value} →
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-amber-50 rounded-2xl px-8 py-6 border border-amber-100">
            <p className="text-slate-700">
              <span className="font-semibold text-slate-900">Office Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
            <p className="text-sm text-slate-600 mt-2">
              We typically respond within 24 hours on business days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
