'use client';

import { useState, useEffect } from 'react';
import { Star, Play } from 'lucide-react';
import Image from 'next/image';

export default function WriteFlowLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Avatar images - update the src paths to match your image filenames
  const avatars = [
    { id: 1, src: '/CUSTOMERS.jpeg', alt: 'Writer 1' },
    { id: 2, src: '/Diana.jpeg', alt: 'Writer 2' },
    { id: 3, src: '/Melissa.jpeg', alt: 'Writer 3' },
    { id: 4, src: '/CUSTOMERS.jpeg', alt: 'Writer 4' },
    { id: 5, src: '/Diana.jpeg', alt: 'Writer 5' },
    { id: 6, src: '/Melissa.jpeg', alt: 'Writer 6' },
    { id: 7, src: '/CUSTOMERS.jpeg', alt: 'Writer 7' }
  ];

  const handleGetStarted = () => {
    console.log('Get Started clicked');
    // Add your navigation logic here
    // router.push('/signup');
  };

  const handleSignIn = () => {
    console.log('Sign In clicked');
    // Add your navigation logic here
    // router.push('/login');
  };

  const handleWatchDemo = () => {
    console.log('Watch Demo clicked');
    // Add your video modal or navigation logic here
  };

  const handleNavClick = (section) => {
    console.log(`Navigating to ${section}`);
    // Add smooth scroll or navigation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl animate-pulse pointer-events-none"
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
          animationDelay: '1s'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
              WriteFlow
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('features')}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavClick('benefits')}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Benefits
              </button>
              <button 
                onClick={() => handleNavClick('pricing')}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Pricing
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSignIn}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Avatar Stack */}
          <div className="flex justify-center items-center mb-8 animate-fade-in">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className="relative w-12 h-12 rounded-full border-2 border-gray-800 transform hover:scale-110 hover:z-10 transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInFromTop 0.6s ease-out forwards'
                  }}
                  title={avatar.alt}
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-slide-up">Simplify Your Creative</span>
            <br />
            <span className="inline-block animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Writing Process{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Transform your writing with AI that understands your voice. From brainstorming to polishing, WriteFlow simplifies every step
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Start your writing journey
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            
            <button 
              onClick={handleWatchDemo}
              className="group flex items-center justify-center gap-2 text-white px-8 py-4 rounded-lg font-medium text-lg border-2 border-purple-500 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <p className="text-gray-400 mb-3">Trusted by over 50,000 writers worldwide</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300">4.8/5.0 ratings</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">2000+ reviews</span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}