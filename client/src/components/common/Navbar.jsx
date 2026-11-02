import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle.jsx';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { fallbackData } from '../../data/fallbackData.js';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Achievements', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
  { name: 'Contact', href: '#contact', id: 'contact' }
];

const Navbar = ({ initials = fallbackData.profile.initials, resumeUrl = fallbackData.profile.resumeUrl }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(['about', 'experience', 'projects', 'skills', 'certifications', 'contact']);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (!isHomePage) return;

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg border-b border-light-border dark:border-dark-border py-3.5'
          : 'bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monospace Logo with Gradient Brackets */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center text-xl font-bold font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-accent-violet rounded-lg px-1.5 py-0.5"
          aria-label="Home"
        >
          <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent font-black mr-0.5 group-hover:scale-110 transition-transform">
            &lt;
          </span>
          <span className="text-light-text dark:text-dark-text tracking-widest">
            {initials || fallbackData.profile.initials}
          </span>
          <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent font-black ml-0.5 group-hover:scale-110 transition-transform">
            /&gt;
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-mono text-sm" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = isHomePage && (item.id ? activeId === item.id : !activeId);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-violet ${
                  isActive
                    ? 'text-accent-violet dark:text-accent-cyan font-semibold'
                    : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-gradient rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <ThemeToggle />
          <a
            href={resumeUrl || fallbackData.profile.resumeUrl}
            download="Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium font-mono border border-accent-violet text-accent-violet dark:text-white hover:bg-accent-violet hover:text-white transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-violet"
          >
            <FiDownload className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-xl border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Panel (Fully opaque so content never shows through) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navItems.map((item) => {
            const isActive = isHomePage && (item.id ? activeId === item.id : !activeId);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-2.5 rounded-xl font-mono text-base transition-colors ${
                  isActive
                    ? 'bg-accent-violet/10 text-accent-violet dark:text-accent-cyan font-semibold border-l-4 border-accent-violet'
                    : 'text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-light-border dark:border-dark-border">
            <a
              href={resumeUrl || fallbackData.profile.resumeUrl}
              download="Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent-gradient text-white font-mono text-sm font-medium shadow-glow"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
