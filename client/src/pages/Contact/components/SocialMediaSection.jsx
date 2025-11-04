import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
} from 'react-icons/fa';

/**
 * Social Media Section
 * Displays links to all social media profiles
 */
export default function SocialMediaSection() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com',
      color: 'bg-blue-600 hover:bg-blue-700',
      followers: '50K',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com',
      color: 'bg-sky-500 hover:bg-sky-600',
      followers: '35K',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com',
      color: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600',
      followers: '75K',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com',
      color: 'bg-blue-700 hover:bg-blue-800',
      followers: '12K',
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com',
      color: 'bg-red-600 hover:bg-red-700',
      followers: '25K',
    },
    {
      name: 'Pinterest',
      icon: FaPinterest,
      url: 'https://pinterest.com',
      color: 'bg-red-500 hover:bg-red-600',
      followers: '18K',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow us on social media for the latest book recommendations, author interviews,
            and community events
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white/10 rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`${social.color} w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg`}>
                    <social.icon className="text-3xl text-white" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-semibold mb-1">{social.name}</h3>

                {/* Followers */}
                <p className="text-sm text-gray-300">
                  {social.followers} followers
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for exclusive deals and new releases
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
