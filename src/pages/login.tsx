// pages/login.tsx
import { useState } from 'react';
import { loginUser } from '@/lib/api';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      router.push('/');
    } catch (error: any) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-black/30 p-8 rounded-2xl shadow-xl backdrop-blur-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">🔐 Welcome Back Wizard</h2>
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <input
          className="w-full p-3 rounded bg-white/10 placeholder:text-white/60 focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 rounded bg-white/10 placeholder:text-white/60 focus:outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded p-3 font-semibold">
          ✨ Login
        </button>
        <p className="text-center text-sm">
          New here? <a href="/register" className="text-indigo-300 underline">Create an account</a>
        </p>
      </form>
    </div>
  );
}
