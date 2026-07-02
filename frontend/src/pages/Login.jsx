import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validators';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Package, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data?.title || 'Invalid email or password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <Package size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">WMS</span>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage your wholesale<br />
            <span className="text-indigo-400">business smarter.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Track orders, inventory, customers, and suppliers — all in one place.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Products tracked', value: '10K+' },
              { label: 'Orders processed', value: '50K+' },
              { label: 'Active customers', value: '2K+' },
              { label: 'Countries served', value: '30+' },
            ].map(stat => (
              <div key={stat.label} className="bg-slate-800 rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600">© 2025 Wholesale Management System</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">WMS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="admin@wms.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" {...register('rememberMe')} className="w-4 h-4 rounded border-slate-300 accent-indigo-600" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-indigo-600/25 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Demo credentials:</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">admin@wms.com / Test@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
