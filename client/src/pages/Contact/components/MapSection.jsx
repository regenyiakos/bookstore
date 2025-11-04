import { FaMapMarkedAlt } from 'react-icons/fa';

/**
 * Map Section
 * Displays store location on an embedded map
 */
export default function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaMapMarkedAlt className="text-5xl text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Us Here
          </h2>
          <p className="text-lg text-gray-600">
            Visit our physical store for a complete browsing experience
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-lg overflow-hidden shadow-xl">
          {/* Placeholder for actual map integration (Google Maps, Mapbox, etc.) */}
          <div className="relative bg-gray-200 h-96 w-full">
            {/* This would be replaced with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkedAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">
                  Map Integration Placeholder
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  1234 Book Street, Literature City, LC 12345
                </p>
                <a
                  href="https://maps.google.com/?q=1234+Book+Street+Literature+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Directions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">By Car</h4>
              <p className="text-gray-600 text-sm">
                Parking available in the adjacent lot. First 2 hours free with validation.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">By Bus</h4>
              <p className="text-gray-600 text-sm">
                Routes 10, 15, and 42 stop within one block of our location.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">By Subway</h4>
              <p className="text-gray-600 text-sm">
                Exit at Central Station and walk 5 minutes north on Book Street.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
