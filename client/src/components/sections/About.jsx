import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiStar, FiCalendar } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView.js';
import { fallbackData } from '../../data/fallbackData.js';

const CountUp = ({ end, duration = 1.2 }) => {
  const endVal = Number(end) || 0;
  const [count, setCount] = useState(endVal);

  useEffect(() => {
    // If user prefers reduced motion, keep final value
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(endVal);
      return;
    }

    let start = 0;
    const stepTime = Math.max(Math.floor((duration * 1000) / endVal), 40);
    setCount(0);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endVal) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endVal, duration]);

  return <span>{count}</span>;
};

const About = ({ profile = {} }) => {
  const merged = { ...fallbackData.profile, ...profile };
  const {
    aboutParagraphs = fallbackData.profile.aboutParagraphs,
    highlightPhrases = fallbackData.profile.highlightPhrases,
    education = fallbackData.profile.education,
    stats = fallbackData.profile.stats
  } = merged;

  const renderParagraph = (text) => {
    if (!text) return null;
    let parts = [text];

    (highlightPhrases || []).forEach((phrase) => {
      const newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string' && part.includes(phrase)) {
          const split = part.split(phrase);
          split.forEach((sub, i) => {
            newParts.push(sub);
            if (i < split.length - 1) {
              newParts.push(
                <span
                  key={`${phrase}-${i}`}
                  className="font-semibold text-accent-violet dark:text-cyan-300"
                >
                  {phrase}
                </span>
              );
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  const primaryEdu = (education && education[0]) || fallbackData.profile.education[0];

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
              01.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
              About Me
            </h2>
          </div>
          <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Paragraphs */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-light-muted dark:text-dark-muted leading-relaxed">
            {(aboutParagraphs && aboutParagraphs.length > 0 ? aboutParagraphs : fallbackData.profile.aboutParagraphs).map((paragraph, index) => (
              <p key={index} className="tracking-wide">
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>

          {/* Right Column: Education Card */}
          <div className="lg:col-span-5 w-full">
            {primaryEdu && (
              <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 shadow-glow-card hover:border-accent-violet transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-violet/10 text-accent-violet dark:text-cyan-400 flex-shrink-0">
                    <FiBookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-light-muted dark:text-dark-muted">
                      Education
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text leading-snug break-words">
                      {primaryEdu.institution}
                    </h3>
                    <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted">
                      {primaryEdu.degree}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-light-muted dark:text-dark-muted pt-1">
                      <FiCalendar className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0" />
                      <span>{primaryEdu.startYear} – {primaryEdu.endYear}</span>
                    </div>
                    {primaryEdu.grade && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-300 text-xs font-mono font-medium mt-2">
                        <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{primaryEdu.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Real Stats Row with Animated Count-Up */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {(stats && stats.length > 0 ? stats : fallbackData.profile.stats).map((stat, idx) => (
            <motion.div
              key={stat.label || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface/60 dark:bg-dark-surface/60 p-6 text-center hover:border-accent-cyan transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-gradient mb-2">
                <CountUp end={stat.value} />+
              </div>
              <div className="text-xs sm:text-sm font-mono text-light-muted dark:text-dark-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
