'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        let errorMessage = 'Login failed';
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (jsonErr) {
          errorMessage = `Server Error (${res.status})`;
        }
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Client login fetch error:", err);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="glass p-8 rounded-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest">ADMIN LOGIN</h1>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded">{error}</div>}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors" 
              placeholder="••••••••" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-white text-black font-bold tracking-wide py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors mt-2 disabled:opacity-70"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
