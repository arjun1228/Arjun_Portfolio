import React from 'react';
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi';
import { fallbackData } from '../../data/fallbackData.js';

const Footer = ({ profile = fallbackData.profile }) => {
  const currentYear = new Date().getFullYear();
  const name = profile.name || fallbackData.profile.name;
  const socials = profile.socials?.length ? profile.socials : fallbackData.profile.socials;
  const email = profile.email || fallbackData.profile.email;

  const githubUrl = socials.find(s => s.platform.toLowerCase() === 'github')?.url;
  const linkedinUrl = socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url;
  const portfolioUrl = socials.find(s => s.platform.toLowerCase() === 'portfolio')?.url;

  return (
    <footer className="relative mt-24 border-t border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-gradient opacity-80" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-light-muted dark:text-dark-muted font-mono">
          <span>&copy; {currentYear}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            Designed &amp; Built with <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by
            <span className="font-semibold text-light-text dark:text-dark-text ml-1">{name}</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-light-muted dark:text-dark-muted">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <FiGithub className="w-4 h-4" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg hover:text-accent-cyan hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
          )}
          {portfolioUrl && (
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="p-2 rounded-lg hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <FiGlobe className="w-4 h-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Send Email"
              className="p-2 rounded-lg hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <FiMail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
