import { FaEnvelope } from 'react-icons/fa';

/**
 * Hero Section for Contact Page
 * Displays welcome message and encourages users to get in touch
 */
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full">
            <FaEnvelope className="text-5xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Get in Touch
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          We'd love to hear from you. Whether you have a question, feedback, or just want to say hello,
          we're here to help.
        </p>
      </div>
    </section>
  );
}
