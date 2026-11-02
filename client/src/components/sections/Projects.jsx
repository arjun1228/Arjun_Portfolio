import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../projects/ProjectCard.jsx';
import Lightbox from '../common/Lightbox.jsx';
import { fallbackData } from '../../data/fallbackData.js';

const Projects = ({ projects = [] }) => {
  const [lightboxState, setLightboxState] = useState({ isOpen: false, imageUrl: '', title: '' });

  const projectList = projects && projects.length > 0 ? projects : fallbackData.projects;

  const sortedProjects = useMemo(() => {
    return [...projectList].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order || 0) - (b.order || 0);
    });
  }, [projectList]);

  const handleOpenLightbox = (imageUrl, title) => {
    setLightboxState({ isOpen: true, imageUrl, title });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, imageUrl: '', title: '' });
  };

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
                03.
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
                Projects
              </h2>
            </div>
            <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProjects.map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
              onImageClick={handleOpenLightbox}
            />
          ))}
        </motion.div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-16 text-light-muted dark:text-dark-muted font-mono text-sm">
            No projects to show yet.
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        imageUrl={lightboxState.imageUrl}
        title={lightboxState.title}
        onClose={handleCloseLightbox}
      />
    </section>
  );
};

export default Projects;
