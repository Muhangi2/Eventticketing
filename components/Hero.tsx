import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <main className="lg:flex lg:items-center lg:justify-between w-full mx-auto px-6 py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-10 lg:mb-0">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-indigo-600">Transforming Events into</span>
          <span className="block text-orange-500">The Ultimate Web3 Experience</span>
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          Join our decentralized marketplace to create and discover vibrant events. Connect with enthusiasts, experts, and innovative services in a secure and anonymous environment tailored for the Web3 community.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
          <Link href="/events/create" className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow hover:bg-indigo-700 transition duration-300">
            Create an Event
          </Link>
          <Link href="/marketplace" className="inline-block mt-4 sm:mt-0 bg-orange-500 text-white font-semibold py-3 px-6 rounded-md shadow hover:bg-orange-600 transition duration-300">
            Explore Marketplace
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2">
        <img
          className="w-full h-auto rounded-md shadow-lg"
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Web3 Event Illustration"
        />
      </div>
    </main>
  );
};

export default Hero;
