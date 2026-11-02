import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiExternalLink, FiShield } from 'react-icons/fi';
import { fallbackData } from '../../data/fallbackData.js';

const typeIcons = {
  certification: {
    icon: FiShield,
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    label: 'Certification'
  },
  internship: {
    icon: FiBriefcase,
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    label: 'Internship'
  },
  achievement: {
    icon: FiAward,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    label: 'Achievement'
  }
};

const Certifications = ({ certifications = [] }) => {
  const list = certifications && certifications.length > 0 ? certifications : fallbackData.certifications;

  return (
    <section id="certifications" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
              05.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
              Certifications
            </h2>
          </div>
          <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item, index) => {
            const config = typeIcons[item.type] || typeIcons.certification;
            const IconComp = config.icon;

            return (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 shadow-glow-card hover:border-accent-violet flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon Tile Tinted by Type */}
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${config.color}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted">
                      {config.label}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-light-muted dark:text-dark-muted mt-1">
                      {item.issuer}
                    </p>
                  </div>
                </div>

                {/* View Credential Link */}
                {item.credentialUrl && (
                  <div className="pt-4 mt-4 border-t border-light-border/60 dark:border-dark-border/60">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-violet dark:text-cyan-400 hover:underline"
                    >
                      <span>View Credential</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
