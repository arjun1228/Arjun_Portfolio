import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiArrowRight, FiMaximize2 } from 'react-icons/fi';

const ProjectCard = ({ project, onImageClick }) => {
  const {
    title,
    description,
    highlights = [],
    tech = [],
    githubUrl,
    liveUrl,
    imageUrl,
    badge
  } = project;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card overflow-hidden shadow-glow-card hover:border-accent-violet dark:hover:border-cyan-400/50 transition-all duration-300"
    >
      {/* Optional Screenshot Banner with Lightbox Trigger */}
      {imageUrl ? (
        <div
          onClick={() => onImageClick && onImageClick(imageUrl, title)}
          className="relative aspect-video w-full overflow-hidden bg-black/20 cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={`${title} project preview`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-mono backdrop-blur-md shadow-lg">
              <FiMaximize2 className="w-3.5 h-3.5" />
              <span>Expand Preview</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="h-2 bg-accent-gradient" />
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        
        {/* Row 1: Code Icon + Action Links (GitHub + Live) */}
        <div className="flex items-center justify-between gap-2">
          <div className="p-2 rounded-lg bg-accent-violet/10 text-accent-violet dark:text-cyan-400">
            <FiCode className="w-4 h-4" />
          </div>
          
          <div className="flex items-center space-x-1">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} source on GitHub`}
                title="View Source on GitHub"
                className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-violet"
              >
                <FiGithub className="w-4 h-4" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo for ${title}`}
                title="View Live Demo"
                className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-accent-cyan hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Row 2: Dedicated Full-Width Badge Row (NEVER overlaps link icons) */}
        {badge && (
          <div className="w-full">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-accent-violet/10 dark:bg-cyan-500/10 text-accent-violet dark:text-cyan-300 border border-accent-violet/20 dark:border-cyan-400/20">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text group-hover:text-accent-violet dark:group-hover:text-cyan-300 transition-colors leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
          {description}
        </p>

        {/* Highlights with arrow bullets */}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-1.5 py-1">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-light-muted dark:text-dark-muted">
                <FiArrowRight className="w-3.5 h-3.5 text-accent-violet dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Monospace Tech Pills */}
        <div className="pt-3 border-t border-light-border/60 dark:border-dark-border/60 flex flex-wrap gap-1.5">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border"
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
