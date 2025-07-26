import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import  api  from '../lib/api';
import { useUser } from '../context/UserContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      const { token, user } = await api.register(name, email, password);
      localStorage.setItem('token', token);
      login(user);
      navigate('/');
    } catch (error: any) {
      setErr(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900 px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-lg p-8 rounded-xl text-white w-full max-w-md border border-purple-300">
        <h1 className="text-3xl font-bold text-center mb-6">🧙 Register</h1>

        {err && <div className="text-red-500 text-center mb-4">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="input" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required type="email" className="input" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required type="password" className="input" />

          <button type="submit" className="w-full bg-purple-700 py-2 rounded hover:bg-purple-600">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
