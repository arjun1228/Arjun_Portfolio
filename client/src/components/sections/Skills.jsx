import React from 'react';
import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiC,
  SiHtml5,
  SiMysql,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiReactrouter,
  SiVite,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiJsonwebtokens,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiLinux,
  SiCloudinary,
  SiVercel,
  SiRender,
  SiClaudecode
} from 'react-icons/si';
import { TbApi, TbBrandRedux, TbBrandCss3, TbBrain, TbCpu, TbDeviceMobile, TbCode, TbBinaryTree } from 'react-icons/tb';
import { FiCode } from 'react-icons/fi';
import { fallbackData } from '../../data/fallbackData.js';

const iconMap = {
  SiJavascript: { icon: SiJavascript, color: 'text-amber-500 dark:text-amber-400' },
  SiPython: { icon: SiPython, color: 'text-sky-600 dark:text-sky-400' },
  SiOpenjdk: { icon: SiOpenjdk, color: 'text-red-600 dark:text-red-400' },
  SiC: { icon: SiC, color: 'text-blue-600 dark:text-blue-400' },
  SiHtml5: { icon: SiHtml5, color: 'text-orange-600 dark:text-orange-500' },
  SiCss3: { icon: TbBrandCss3, color: 'text-blue-600 dark:text-blue-400' },
  TbBrandCss3: { icon: TbBrandCss3, color: 'text-blue-600 dark:text-blue-400' },
  SiMysql: { icon: SiMysql, color: 'text-sky-700 dark:text-sky-400' },
  SiReact: { icon: SiReact, color: 'text-cyan-600 dark:text-cyan-400' },
  SiTailwindcss: { icon: SiTailwindcss, color: 'text-teal-600 dark:text-cyan-400' },
  SiFramer: { icon: SiFramer, color: 'text-pink-600 dark:text-pink-400' },
  SiReactrouter: { icon: SiReactrouter, color: 'text-rose-600 dark:text-rose-400' },
  SiVite: { icon: SiVite, color: 'text-purple-600 dark:text-purple-400' },
  SiAxios: { icon: SiAxios, color: 'text-indigo-600 dark:text-indigo-400' },
  SiNodedotjs: { icon: SiNodedotjs, color: 'text-emerald-600 dark:text-emerald-400' },
  SiExpress: { icon: SiExpress, color: 'text-slate-800 dark:text-slate-100' },
  SiMongodb: { icon: SiMongodb, color: 'text-emerald-600 dark:text-emerald-400' },
  SiMongoose: { icon: SiMongoose, color: 'text-red-600 dark:text-red-400' },
  TbApi: { icon: TbApi, color: 'text-cyan-600 dark:text-cyan-400' },
  SiJsonwebtokens: { icon: SiJsonwebtokens, color: 'text-purple-600 dark:text-purple-400' },
  SiGit: { icon: SiGit, color: 'text-orange-600 dark:text-orange-500' },
  SiGithub: { icon: SiGithub, color: 'text-slate-900 dark:text-white' },
  SiPostman: { icon: SiPostman, color: 'text-orange-600 dark:text-orange-400' },
  SiDocker: { icon: SiDocker, color: 'text-blue-600 dark:text-sky-400' },
  SiLinux: { icon: SiLinux, color: 'text-amber-600 dark:text-amber-400' },
  SiCloudinary: { icon: SiCloudinary, color: 'text-blue-600 dark:text-blue-400' },
  SiVercel: { icon: SiVercel, color: 'text-slate-900 dark:text-white' },
  SiRender: { icon: SiRender, color: 'text-violet-600 dark:text-violet-400' },
  SiClaudecode: { icon: SiClaudecode, color: 'text-orange-600 dark:text-orange-400' },
  TbBrandRedux: { icon: TbBrandRedux, color: 'text-purple-600 dark:text-purple-400' },
  TbDeviceMobile: { icon: TbDeviceMobile, color: 'text-sky-600 dark:text-sky-400' },
  TbBinaryTree: { icon: TbBinaryTree, color: 'text-emerald-600 dark:text-emerald-400' },
  TbCode: { icon: TbCode, color: 'text-indigo-600 dark:text-indigo-400' },
  TbBrain: { icon: TbBrain, color: 'text-fuchsia-600 dark:text-fuchsia-400' },
  TbCpu: { icon: TbCpu, color: 'text-slate-700 dark:text-slate-200' },
  FiCode: { icon: FiCode, color: 'text-accent-violet dark:text-cyan-400' }
};

const SkillIcon = ({ iconKey }) => {
  const match = iconMap[iconKey];
  if (match) {
    const IconComp = match.icon;
    return <IconComp className={`w-6 h-6 ${match.color}`} />;
  }
  return <FiCode className="w-6 h-6 text-accent-violet dark:text-cyan-400" />;
};

const Skills = ({ skills = [] }) => {
  const list = skills && skills.length > 0 ? skills : fallbackData.skills;

  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
              04.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
              Skills &amp; Technologies
            </h2>
          </div>
          <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
        </div>

        {/* 2-Column Grid of Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {list.map((categoryGroup, index) => (
            <div
              key={categoryGroup._id || index}
              className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 sm:p-8 shadow-glow-card hover:border-accent-violet dark:hover:border-accent-violet/40 transition-colors duration-300"
            >
              <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold text-accent-violet dark:text-[#a78bfa] mb-6">
                {categoryGroup.category}
              </h3>

              {/* Square icon tiles with names underneath */}
              <div className="flex flex-wrap gap-x-3 gap-y-5 sm:gap-x-4">
                {categoryGroup.items?.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group flex w-[84px] sm:w-[92px] flex-col items-center gap-2"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-light-border dark:border-dark-border bg-transparent group-hover:border-accent-violet group-hover:-translate-y-0.5 transition-all duration-200">
                      <SkillIcon iconKey={skill.iconKey} />
                    </div>
                    <span className="text-center text-[10.5px] sm:text-[11px] leading-snug text-light-muted dark:text-dark-muted group-hover:text-light-text dark:group-hover:text-dark-text transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
