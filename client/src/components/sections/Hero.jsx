import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiFileText, FiArrowDown } from 'react-icons/fi';
import { fallbackData } from '../../data/fallbackData.js';

const Hero = ({ profile = {} }) => {
  const merged = { ...fallbackData.profile, ...profile };
  const {
    name,
    headline,
    tagline,
    statusBadge,
    email,
    phone,
    showPhone,
    location,
    photoUrl,
    resumeUrl,
    socials = []
  } = merged;

  const githubUrl = socials.find(s => s.platform?.toLowerCase() === 'github')?.url;
  const linkedinUrl = socials.find(s => s.platform?.toLowerCase() === 'linkedin')?.url;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1 bg-accent-gradient shadow-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-dark-surface border-4 border-light-bg dark:border-dark-bg">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900/60 to-cyan-900/60 text-white font-mono text-4xl sm:text-5xl font-bold">
                    {name?.split(' ').map(n => n[0]).join('') || 'AK'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm font-mono text-light-muted dark:text-dark-muted"
            >
              {statusBadge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            >
              <span className="text-light-text dark:text-dark-text">Hi, I'm </span>
              <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl font-semibold text-light-text dark:text-gray-200 leading-relaxed"
            >
              {headline} • {tagline}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-light-muted dark:text-dark-muted"
            >
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-1.5 hover:text-accent-violet transition-colors"
                >
                  <FiMail className="text-accent-violet" />
                  <span>{email}</span>
                </a>
              )}
              {showPhone && phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-1.5 hover:text-accent-cyan transition-colors"
                >
                  <FiPhone className="text-accent-cyan" />
                  <span>{phone}</span>
                </a>
              )}
              {location && (
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="text-rose-400" />
                  <span>{location}</span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm"
            >
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-violet/40 bg-accent-violet/10 text-light-text dark:text-dark-text font-semibold hover:bg-accent-violet/20 hover:border-accent-violet transition-all"
                >
                  <FiLinkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 text-light-text dark:text-dark-text font-semibold hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-violet/40 bg-accent-violet/10 text-light-text dark:text-dark-text font-semibold hover:bg-accent-violet/20 hover:border-accent-violet transition-all"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}
              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 text-light-text dark:text-dark-text font-semibold hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all"
              >
                <span>Contact</span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-2 text-xs font-mono text-light-muted dark:text-dark-muted hover:text-accent-violet transition-colors group"
          >
            <span>Scroll to explore</span>
            <div className="p-2 rounded-full border border-light-border dark:border-dark-border group-hover:border-accent-violet animate-bounce">
              <FiArrowDown className="w-4 h-4 text-accent-cyan" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
