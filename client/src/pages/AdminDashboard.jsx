import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from '../components/common/ThemeToggle.jsx';
import Toast from '../components/common/Toast.jsx';

import {
  getProfile,
  getExperiences,
  getProjects,
  getSkills,
  getCertifications
} from '../api/portfolioApi.js';

import {
  updateAdminProfile,
  createAdminExperience,
  updateAdminExperience,
  deleteAdminExperience,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
  createAdminCertification,
  updateAdminCertification,
  deleteAdminCertification,
  getAdminMessages,
  markMessageRead,
  deleteAdminMessage,
  uploadImageApi
} from '../api/authApi.js';

import {
  FiUser,
  FiBriefcase,
  FiFolder,
  FiCpu,
  FiAward,
  FiMail,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiExternalLink,
  FiArrowLeft,
  FiUpload
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Data states
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Forms / Modals
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadAllData = async () => {
    try {
      const [profRes, expRes, projRes, skillRes, certRes, msgRes] = await Promise.all([
        getProfile().catch(() => null),
        getExperiences().catch(() => ({ data: [] })),
        getProjects().catch(() => ({ data: [] })),
        getSkills().catch(() => ({ data: [] })),
        getCertifications().catch(() => ({ data: [] })),
        getAdminMessages().catch(() => ({ data: [], unreadCount: 0 }))
      ]);

      if (profRes?.data) setProfile(profRes.data);
      if (expRes?.data) setExperiences(expRes.data);
      if (projRes?.data) setProjects(projRes.data);
      if (skillRes?.data) setSkills(skillRes.data);
      if (certRes?.data) setCertifications(certRes.data);
      if (msgRes?.data) {
        setMessages(msgRes.data);
        setUnreadCount(msgRes.unreadCount || 0);
      }
    } catch (err) {
      showToast('Error loading dashboard data', 'error');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Image upload handler
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImageApi(file);
      if (res.success && res.data?.url) {
        callback(res.data.url);
        showToast('Image uploaded successfully', 'success');
      }
    } catch (err) {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col">
      {/* Top Header */}
      <header className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-mono text-light-muted dark:text-dark-muted hover:text-accent-violet transition-colors"
          >
            <FiArrowLeft />
            <span>Live Portfolio</span>
          </Link>
          <div className="h-4 w-[1px] bg-light-border dark:border-dark-border" />
          <h1 className="text-lg font-bold font-mono text-gradient">
            Admin Panel
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-mono text-light-muted dark:text-dark-muted">
            {user?.email}
          </span>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-mono transition-colors"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <div className="flex-1 max-w-content mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Navigation Tabs */}
        <aside className="lg:w-60 flex-shrink-0">
          <div className="flex lg:flex-col overflow-x-auto gap-1 p-1 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border">
            {[
              { id: 'projects', label: 'Projects', icon: FiFolder, count: projects.length },
              { id: 'experience', label: 'Experience', icon: FiBriefcase, count: experiences.length },
              { id: 'skills', label: 'Skills', icon: FiCpu, count: skills.length },
              { id: 'certifications', label: 'Certifications', icon: FiAward, count: certifications.length },
              { id: 'messages', label: 'Messages', icon: FiMail, count: messages.length, badge: unreadCount },
              { id: 'profile', label: 'Profile Copy', icon: FiUser }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setEditingItem(null);
                    setShowModal(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-xs sm:text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-accent-gradient text-white shadow-glow'
                      : 'text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
                      {tab.badge}
                    </span>
                  ) : tab.count !== undefined ? (
                    <span className={`text-[11px] ${isActive ? 'text-white/80' : 'opacity-60'}`}>
                      {tab.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 shadow-glow-card min-h-[500px]">
          
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                    Manage Projects
                  </h2>
                  <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Add, edit, reorder or feature your portfolio projects
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({
                      title: '',
                      description: '',
                      category: 'Full Stack',
                      highlights: [''],
                      tech: [''],
                      githubUrl: '',
                      liveUrl: '',
                      imageUrl: '',
                      badge: '',
                      featured: false,
                      order: projects.length + 1
                    });
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm"
                >
                  <FiPlus />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Table / List */}
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {proj.imageUrl && (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-light-text dark:text-dark-text">
                            {proj.title}
                          </h4>
                          {proj.featured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                          {proj.category} • Order: {proj.order || 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingItem({ ...proj });
                          setShowModal(true);
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        title="Edit Project"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm(`Delete "${proj.title}"?`)) {
                            await deleteAdminProject(proj._id);
                            showToast('Project deleted', 'success');
                            loadAllData();
                          }
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete Project"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                    Work Experience
                  </h2>
                  <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Maintain career positions, internships, and achievement bullets
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({
                      role: '',
                      company: '',
                      partner: '',
                      type: 'Full-time',
                      startDate: '',
                      endDate: 'Present',
                      current: true,
                      bullets: [''],
                      order: experiences.length + 1
                    });
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm"
                >
                  <FiPlus />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-light-text dark:text-dark-text">
                        {exp.role} <span className="text-accent-violet">@ {exp.company}</span>
                      </h4>
                      <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                        {exp.startDate} – {exp.endDate} ({exp.type})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingItem({ ...exp });
                          setShowModal(true);
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm(`Delete experience entry?`)) {
                            await deleteAdminExperience(exp._id);
                            showToast('Experience deleted', 'success');
                            loadAllData();
                          }
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                    Skills Categories
                  </h2>
                  <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Organize technology categories and skills
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({
                      category: '',
                      order: skills.length + 1,
                      items: [{ name: '', iconKey: 'SiJavascript' }]
                    });
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm"
                >
                  <FiPlus />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="space-y-4">
                {skills.map((cat) => (
                  <div
                    key={cat._id}
                    className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold font-mono text-sm text-light-text dark:text-dark-text">
                        {cat.category}
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem({ ...cat });
                            setShowModal(true);
                          }}
                          className="p-1.5 rounded-lg text-light-muted hover:text-accent-violet"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Delete category "${cat.category}"?`)) {
                              await deleteAdminSkill(cat._id);
                              showToast('Skill category deleted', 'success');
                              loadAllData();
                            }
                          }}
                          className="p-1.5 rounded-lg text-light-muted hover:text-rose-500"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items?.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                    Certifications &amp; Achievements
                  </h2>
                  <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Showcase verified credentials, badges, and awards
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingItem({
                      title: '',
                      issuer: '',
                      type: 'certification',
                      credentialUrl: '',
                      order: certifications.length + 1
                    });
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm"
                >
                  <FiPlus />
                  <span>Add Credential</span>
                </button>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-light-text dark:text-dark-text">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                        {cert.issuer} • Type: {cert.type}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setEditingItem({ ...cert });
                          setShowModal(true);
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-accent-violet hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm(`Delete "${cert.title}"?`)) {
                            await deleteAdminCertification(cert._id);
                            showToast('Certification deleted', 'success');
                            loadAllData();
                          }
                        }}
                        className="p-2 rounded-lg text-light-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                    Inbox ({messages.length})
                  </h2>
                  <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                    Direct inquiries submitted via the public contact form
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-sm font-mono text-light-muted dark:text-dark-muted py-8 text-center">
                    No incoming messages yet.
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-5 rounded-xl border transition-all ${
                        msg.read
                          ? 'border-light-border dark:border-dark-border bg-light-surface/40 dark:bg-dark-surface/40 opacity-80'
                          : 'border-accent-violet/50 bg-accent-violet/5 dark:bg-accent-violet/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-light-text dark:text-dark-text">
                            {msg.name}
                          </span>
                          <span className="text-xs font-mono text-light-muted dark:text-dark-muted">
                            &lt;{msg.email}&gt;
                          </span>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-white font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-light-muted dark:text-dark-muted">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-semibold text-sm text-light-text dark:text-dark-text mb-2">
                        Subject: {msg.subject}
                      </h4>
                      <p className="text-sm text-light-muted dark:text-dark-muted whitespace-pre-wrap bg-light-card dark:bg-dark-card p-3 rounded-lg border border-light-border dark:border-dark-border mb-3">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono text-light-muted dark:text-dark-muted">
                          IP: {msg.ip || 'Unknown'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={async () => {
                              await markMessageRead(msg._id, !msg.read);
                              loadAllData();
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-mono border border-light-border dark:border-dark-border hover:border-accent-violet transition-colors"
                          >
                            {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm('Delete this message?')) {
                                await deleteAdminMessage(msg._id);
                                showToast('Message deleted', 'success');
                                loadAllData();
                              }
                            }}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && profile && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-mono text-light-text dark:text-dark-text">
                  Profile &amp; Biography Copy
                </h2>
                <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
                  Update primary developer information, headline, tagline, and SEO meta tags
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await updateAdminProfile(profile);
                    showToast('Profile updated successfully', 'success');
                  } catch (err) {
                    showToast('Failed to update profile', 'error');
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Headline</label>
                    <input
                      type="text"
                      value={profile.headline || ''}
                      onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono mb-1">Tagline</label>
                  <input
                    type="text"
                    value={profile.tagline || ''}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Phone</label>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Location</label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm hover:opacity-95"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL FOR ADDING / EDITING ITEMS */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <h3 className="text-lg font-bold font-mono text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
              {editingItem._id ? 'Edit Entry' : 'Create New Entry'}
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (activeTab === 'projects') {
                    if (editingItem._id) {
                      await updateAdminProject(editingItem._id, editingItem);
                    } else {
                      await createAdminProject(editingItem);
                    }
                  } else if (activeTab === 'experience') {
                    if (editingItem._id) {
                      await updateAdminExperience(editingItem._id, editingItem);
                    } else {
                      await createAdminExperience(editingItem);
                    }
                  } else if (activeTab === 'skills') {
                    if (editingItem._id) {
                      await updateAdminSkill(editingItem._id, editingItem);
                    } else {
                      await createAdminSkill(editingItem);
                    }
                  } else if (activeTab === 'certifications') {
                    if (editingItem._id) {
                      await updateAdminCertification(editingItem._id, editingItem);
                    } else {
                      await createAdminCertification(editingItem);
                    }
                  }
                  showToast('Saved successfully', 'success');
                  setShowModal(false);
                  loadAllData();
                } catch (err) {
                  showToast(err.response?.data?.message || 'Save failed', 'error');
                }
              }}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              {/* Dynamic Project Fields */}
              {activeTab === 'projects' && (
                <>
                  <div>
                    <label className="block text-xs font-mono mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Category</label>
                    <select
                      value={editingItem.category || 'Full Stack'}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Description *</label>
                    <textarea
                      required
                      rows="3"
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingItem.tech) ? editingItem.tech.join(', ') : editingItem.tech || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, tech: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="React, Express, MongoDB, Tailwind CSS"
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Image URL / Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.imageUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                      <label className="px-3 py-2 rounded-xl bg-accent-violet/20 hover:bg-accent-violet/30 cursor-pointer flex items-center gap-1.5 text-xs font-mono">
                        <FiUpload />
                        <span>{uploadingImage ? '...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setEditingItem(prev => ({ ...prev, imageUrl: url })))}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={editingItem.githubUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1">Live URL</label>
                      <input
                        type="text"
                        value={editingItem.liveUrl || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editingItem.featured)}
                        onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                        className="rounded accent-violet-600"
                      />
                      <span>Mark as Featured</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-mono">Order:</label>
                      <input
                        type="number"
                        value={editingItem.order || 0}
                        onChange={(e) => setEditingItem({ ...editingItem, order: Number(e.target.value) })}
                        className="w-16 px-2 py-1 rounded bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-xs font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Dynamic Experience Fields */}
              {activeTab === 'experience' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono mb-1">Role *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.role || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1">Company *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.company || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono mb-1">Start Date *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jun 2024"
                        value={editingItem.startDate || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1">End Date</label>
                      <input
                        type="text"
                        placeholder="Present"
                        value={editingItem.endDate || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Achievement Bullets (one per line) *</label>
                    <textarea
                      rows="4"
                      required
                      value={Array.isArray(editingItem.bullets) ? editingItem.bullets.join('\n') : editingItem.bullets || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, bullets: e.target.value.split('\n').filter(Boolean) })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                </>
              )}

              {/* Dynamic Skills Category Fields */}
              {activeTab === 'skills' && (
                <>
                  <div>
                    <label className="block text-xs font-mono mb-1">Category Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Skill Names (comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.items?.map(i => i.name).join(', ') || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        items: e.target.value.split(',').map(name => ({ name: name.trim(), iconKey: 'SiJavascript' })).filter(i => i.name)
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                </>
              )}

              {/* Dynamic Certification Fields */}
              {activeTab === 'certifications' && (
                <>
                  <div>
                    <label className="block text-xs font-mono mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Issuer *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.issuer || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Type</label>
                    <select
                      value={editingItem.type || 'certification'}
                      onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    >
                      <option value="certification">Certification</option>
                      <option value="internship">Internship</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1">Credential URL</label>
                    <input
                      type="text"
                      value={editingItem.credentialUrl || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, credentialUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-light-border dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-accent-gradient text-white text-xs font-mono font-medium shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default AdminDashboard;

