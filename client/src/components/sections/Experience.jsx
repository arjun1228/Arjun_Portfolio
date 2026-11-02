import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { fallbackData } from '../../data/fallbackData.js';

const Experience = ({ experiences = [] }) => {
  const list = experiences.length > 0 ? experiences : fallbackData.experiences;

  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
              02.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
              Hackathons &amp; Achievements
            </h2>
          </div>
          <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
        </div>

        {/* Vertical Timeline with distinct gaps (space-y-10 = 40px gap between cards) */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-accent-violet/30 dark:border-cyan-500/20 space-y-10 sm:space-y-12">
          
          {list.map((exp, index) => {
            const isCurrent = exp.current || exp.endDate?.toLowerCase() === 'present';
            const hasRange = exp.startDate && exp.endDate && exp.startDate !== exp.endDate;
            const displayDate = hasRange ? `${exp.startDate} – ${exp.endDate}` : (exp.startDate || exp.endDate);
            
            return (
              <div
                key={exp._id || index}
                className="relative group transition-all duration-300"
              >
                {/* Glowing Dot on Timeline Line */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-accent-violet ring-4 ring-light-bg dark:ring-dark-bg group-hover:scale-125 transition-transform duration-300 shadow-glow" />

                {/* Experience Card */}
                <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 sm:p-8 shadow-glow-card hover:border-accent-violet transition-all duration-300 space-y-4">
                  
                  {/* Top Bar: Role & Company & Dates */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent-violet/10 text-accent-violet dark:text-cyan-400 flex-shrink-0">
                          <FiAward className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text">
                          {exp.role}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-sm sm:text-base font-semibold text-accent-violet dark:text-cyan-300">
                          {exp.company}
                        </span>
                        {exp.partner && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border">
                            Partner: {exp.partner}
                          </span>
                        )}
                        {exp.type && (
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-300 font-medium">
                            {exp.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Monospace Date Range & Pulsing Present Dot */}
                    {displayDate && (
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-light-muted dark:text-dark-muted bg-light-surface dark:bg-dark-surface px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border w-fit">
                      <FiCalendar className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      <span>{displayDate}</span>
                      {isCurrent && (
                        <span className="flex h-2 w-2 relative ml-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>
                    )}
                  </div>

                  {/* Bullet points with arrow icons (Never empty) */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                          <FiArrowRight className="w-4 h-4 text-accent-violet dark:text-accent-cyan flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Experience;
