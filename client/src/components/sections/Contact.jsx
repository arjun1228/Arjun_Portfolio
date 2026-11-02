import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiCopy, FiCheck, FiSend, FiGlobe } from 'react-icons/fi';
import { submitContactMessage } from '../../api/portfolioApi.js';
import Toast from '../common/Toast.jsx';
import { fallbackData } from '../../data/fallbackData.js';

const Contact = ({ profile = {} }) => {
  const merged = { ...fallbackData.profile, ...profile };
  const {
    email,
    phone,
    showPhone,
    location,
    contactIntro,
    socials = []
  } = merged;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      showToast("Email address copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      showToast("Failed to copy email", "error");
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await submitContactMessage(formData);
      if (res && res.success) {
        showToast(res.message || "Thank you! Your message has been sent.", "success");
        setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' });
      } else {
        showToast(res?.message || "Message delivered to offline log. Thank you!", "info");
      }
    } catch (err) {
      showToast("Server is offline. Please email directly at the address listed.", "info");
    } finally {
      setSubmitting(false);
    }
  };

  const githubUrl = socials.find(s => s.platform.toLowerCase() === 'github')?.url;
  const linkedinUrl = socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url;
  const portfolioUrl = socials.find(s => s.platform.toLowerCase() === 'portfolio')?.url;

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pattern */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent-violet dark:text-accent-cyan text-lg font-bold">
              06.
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
              Get In Touch
            </h2>
          </div>
          <div className="h-1 w-20 bg-accent-gradient rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Intro & Contact Information (Strictly Left-Aligned, NO Zigzag) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted leading-relaxed">
              {contactIntro}
            </p>

            {/* Left-Aligned Contact Details List with Uniform Width and Structure */}
            <div className="space-y-3.5">
              
              {/* Email with copy-to-clipboard */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card hover:border-accent-violet transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-accent-violet/10 text-accent-violet dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted">
                      Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm font-mono text-light-text dark:text-dark-text hover:text-accent-violet dark:hover:text-cyan-300 transition-colors truncate"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                  className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-violet flex-shrink-0 ml-2"
                >
                  {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone (if enabled) */}
              {showPhone && phone && (
                <div className="flex items-center p-3.5 sm:p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted">
                        Phone
                      </span>
                      <a
                        href={`tel:${phone}`}
                        className="text-xs sm:text-sm font-mono text-light-text dark:text-dark-text hover:text-accent-cyan transition-colors truncate"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="flex items-center p-3.5 sm:p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted">
                        Location
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-light-text dark:text-dark-text truncate">
                        {location}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Social Links Row */}
            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted block mb-3">
                Connect on Platforms
              </span>
              <div className="flex items-center gap-3">
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:border-accent-violet hover:text-accent-violet dark:hover:text-cyan-400 hover:scale-105 transition-all shadow-sm"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:border-accent-violet hover:text-accent-violet dark:hover:text-cyan-400 hover:scale-105 transition-all shadow-sm"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                )}
                {portfolioUrl && (
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Personal Portfolio link"
                    className="p-3 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:border-accent-violet hover:text-accent-violet dark:hover:text-cyan-400 hover:scale-105 transition-all shadow-sm"
                  >
                    <FiGlobe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 sm:p-8 shadow-glow-card">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                
                {/* Honeypot Spam Trap */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_honeypot">Leave this blank</label>
                  <input
                    type="text"
                    id="_honeypot"
                    name="_honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData._honeypot}
                    onChange={handleChange}
                  />
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-light-text dark:text-dark-text"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border ${
                        formErrors.name ? 'border-rose-500' : 'border-light-border dark:border-dark-border'
                      } text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet transition-colors`}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-rose-400 font-mono">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-light-text dark:text-dark-text"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border ${
                        formErrors.email ? 'border-rose-500' : 'border-light-border dark:border-dark-border'
                      } text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet transition-colors`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-400 font-mono">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-light-text dark:text-dark-text"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border ${
                      formErrors.subject ? 'border-rose-500' : 'border-light-border dark:border-dark-border'
                    } text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet transition-colors`}
                  />
                  {formErrors.subject && (
                    <p className="text-xs text-rose-400 font-mono">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-light-text dark:text-dark-text"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Hi, I'd like to discuss an opportunity or project..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border ${
                      formErrors.message ? 'border-rose-500' : 'border-light-border dark:border-dark-border'
                    } text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet transition-colors resize-y`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-rose-400 font-mono">{formErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-accent-gradient text-white font-medium text-sm shadow-glow hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </section>
  );
};

export default Contact;
