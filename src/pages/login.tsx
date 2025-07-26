import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  api  from '../lib/api';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect after login context updates
  useEffect(() => {
    if (user && user?.email) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      const { token, user } = await api.login(email, password);

      // Save token
      localStorage.setItem('token', token);

      // Save user to context
      login(user);

      // Optional: navigate here as fallback
      navigate('/');
      console.log("Logging in...");
      console.log("User:", user);
      console.log("Token:", localStorage.getItem("token"));
    } catch (error: any) {
      setErr(
        error?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f0037] to-[#3f0d63] px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-[#a07cc5] text-white">
        <h1 className="text-3xl font-bold text-center mb-6 font-serif text-gold-200">
          ✨ Welcome to WizardKart
        </h1>

        {err && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4 text-sm text-center">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-[#a07cc5] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4a5ff]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-[#a07cc5] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#d4a5ff]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7a44a2] hover:bg-[#a362d3] text-white font-semibold py-2 rounded transition duration-300 ease-in-out"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-200">
          New to WizardKart?{' '}
          <Link to="/register" className="text-[#d4a5ff] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}