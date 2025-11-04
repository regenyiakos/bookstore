import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ContactInfoSection from './components/ContactInfoSection';
import ContactFormSection from './components/ContactFormSection';
import FAQSection from './components/FAQSection';
import MapSection from './components/MapSection';
import SocialMediaSection from './components/SocialMediaSection';

/**
 * Contact Page Component
 *
 * Displays comprehensive contact information including:
 * - Hero section with welcome message
 * - Contact information (address, phone, email, hours)
 * - Contact form for direct messaging
 * - FAQ section with common questions
 * - Map showing physical location
 * - Social media links and newsletter signup
 *
 * @component
 */
export default function ContactPage() {
  // Set page title on mount
  useEffect(() => {
    document.title = 'Contact Us - BookStore | Get in Touch';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Information */}
      <ContactInfoSection />

      {/* Contact Form */}
      <ContactFormSection />

      {/* FAQ */}
      <FAQSection />

      {/* Map Location */}
      <MapSection />

      {/* Social Media & Newsletter */}
      <SocialMediaSection />
    </main>
  );
}
