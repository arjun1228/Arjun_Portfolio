import React from 'react';
import SEO from '../components/common/SEO.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx';
import Navbar from '../components/common/Navbar.jsx';
import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import Experience from '../components/sections/Experience.jsx';
import Projects from '../components/sections/Projects.jsx';
import Skills from '../components/sections/Skills.jsx';
import Certifications from '../components/sections/Certifications.jsx';
import Contact from '../components/sections/Contact.jsx';
import Footer from '../components/common/Footer.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

import { useFetch } from '../hooks/useFetch.js';
import { fallbackData } from '../data/fallbackData.js';
import {
  getProfile,
  getExperiences,
  getProjects,
  getSkills,
  getCertifications
} from '../api/portfolioApi.js';

const Home = () => {
  const { data: profile } = useFetch(getProfile, 'profile');
  const { data: experiences } = useFetch(getExperiences, 'experiences');
  const { data: projects } = useFetch(getProjects, 'projects');
  const { data: skills } = useFetch(getSkills, 'skills');
  const { data: certifications } = useFetch(getCertifications, 'certifications');

  const safeProfile = profile || fallbackData.profile;
  const safeExperiences = experiences && experiences.length > 0 ? experiences : fallbackData.experiences;
  const safeProjects = projects && projects.length > 0 ? projects : fallbackData.projects;
  const safeSkills = skills && skills.length > 0 ? skills : fallbackData.skills;
  const safeCertifications = certifications && certifications.length > 0 ? certifications : fallbackData.certifications;

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text bg-radial-glow transition-colors duration-300">
      <SEO
        title={safeProfile.seo?.title || `${safeProfile.name} | Developer Portfolio`}
        description={safeProfile.seo?.description || safeProfile.tagline}
        ogImage={safeProfile.seo?.ogImage || safeProfile.photoUrl}
      />
      <ScrollProgress />
      <Navbar initials={safeProfile.initials} resumeUrl={safeProfile.resumeUrl} />

      <main id="main-content">
        <Hero profile={safeProfile} />
        <About profile={safeProfile} />
        <Experience experiences={safeExperiences} />
        <Projects projects={safeProjects} />
        <Skills skills={safeSkills} />
        <Certifications certifications={safeCertifications} />
        <Contact profile={safeProfile} />
      </main>

      <Footer profile={safeProfile} />
      <ScrollToTop />
    </div>
  );
};

export default Home;
