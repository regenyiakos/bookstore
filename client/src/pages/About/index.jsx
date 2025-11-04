import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ValuesSection from './components/ValuesSection';
import DifferentiatorsSection from './components/DifferentiatorsSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';

/**
 * About Page Component
 *
 * Displays information about BookStore including:
 * - Company mission and story
 * - Core values and principles
 * - Competitive differentiators
 * - Key statistics and achievements
 * - Contact information
 * - Call-to-action sections
 *
 * @component
 */
export default function AboutPage() {
  // Set page title on mount
  useEffect(() => {
    document.title = 'About Us - BookStore | Your Gateway to Literature';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Our Story */}
      <StorySection />

      {/* Mission & Values */}
      <ValuesSection />

      {/* What Makes Us Different */}
      <DifferentiatorsSection />

      {/* Statistics */}
      <StatsSection />

      {/* Contact Information */}
      <ContactSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
