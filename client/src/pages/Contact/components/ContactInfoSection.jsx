import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

/**
 * Contact Information Section
 * Displays company contact details including address, phone, email, and hours
 */
export default function ContactInfoSection() {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      content: '1234 Book Street, Literature City, LC 12345',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: 'support@bookstore.com',
      link: 'mailto:support@bookstore.com',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM\nSun: Closed',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find all the ways to reach us. We're always happy to assist you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div className={`${info.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <info.icon className={`text-2xl ${info.color}`} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {info.title}
              </h3>

              {/* Content */}
              {info.link ? (
                <a
                  href={info.link}
                  className={`${info.color} hover:underline whitespace-pre-line`}
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600 whitespace-pre-line">
                  {info.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
