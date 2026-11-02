import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import ThemeToggle from '../components/common/ThemeToggle.jsx';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired')) {
      setError('Your admin session has expired. Please log in again.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col justify-center items-center px-4 py-12 relative bg-radial-glow">
      <div className="absolute top-6 left-6 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-mono text-light-muted dark:text-dark-muted hover:text-accent-violet transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Portfolio</span>
        </Link>
      </div>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-accent-violet/10 text-accent-violet dark:text-cyan-400 mb-2">
            <FiLock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-mono tracking-tight text-light-text dark:text-dark-text">
            Admin Authentication
          </h2>
          <p className="text-xs font-mono text-light-muted dark:text-dark-muted">
            Sign in to manage portfolio content and review messages
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-light-muted dark:text-dark-muted">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light-muted dark:text-dark-muted">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.dev"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-light-muted dark:text-dark-muted">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light-muted dark:text-dark-muted">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-surface dark:bg-[#181830] border border-light-border dark:border-dark-border text-light-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent-violet"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl bg-accent-gradient text-white text-sm font-semibold shadow-glow hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {submitting ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="pt-2 text-center">
          <p className="text-[11px] font-mono text-light-muted dark:text-dark-muted">
            Credentials seeded from environment variables: <br />
            <code>admin@portfolio.dev / Admin@12345</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

