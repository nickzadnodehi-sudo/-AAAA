import React, { useState } from 'react';
import { DEMO_USERS } from '../../data/corporateData';
import { UserProfile, UserRole } from '../../types';
import { ShieldCheck, User, Lock, X, Check, KeyRound } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [username, setUsername] = useState('nikzad.nodehi');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const currentUser = DEMO_USERS.find((u) => u.role === selectedRole) || DEMO_USERS[0];

  const handleQuickLogin = (user: UserProfile) => {
    onLogin(user);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(currentUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#1F1F1F] text-white rounded-3xl max-w-lg w-full border border-slate-700 shadow-2xl p-6 md:p-8 text-right space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-[#2B2B2B] hover:bg-[#333] text-slate-400 hover:text-white cursor-pointer transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2B2B] text-amber-300 text-xs font-bold border border-[#F9C319]/30">
            <ShieldCheck className="w-4 h-4 text-[#F9C319]" />
            <span>پورتال اختصاصی پرسنل AKPH</span>
          </div>
          <h2 className="text-2xl font-black text-white">ورود به اتوماسیون اعضا</h2>
          <p className="text-xs text-slate-400">
            لطفا سطح دسترسی سازمانی خود را جهت ورود به محیط کار هوشمند انتخاب کنید:
          </p>
        </div>

        {/* 4 Role Selector Tabs for quick demo testing */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">انتخاب سریع نقش کاربر (RBAC):</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEMO_USERS.map((usr) => {
              const isSelected = selectedRole === usr.role;
              return (
                <button
                  key={usr.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(usr.role);
                    setUsername(usr.name.split(' ')[0]);
                  }}
                  className={`p-3 rounded-xl border text-right transition flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-[#F9C319] text-white shadow-md'
                      : 'bg-[#2B2B2B] border-slate-700 text-slate-300 hover:bg-[#333]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                    isSelected ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {usr.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate text-white">{usr.roleLabel}</div>
                    <div className="text-[11px] text-amber-300 truncate mt-0.5">{usr.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected User Badge */}
        <div className="p-3 bg-[#262626] rounded-xl border border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#F9C319]" />
            <span>کاربر انتخاب‌شده: <strong className="text-amber-300">{currentUser.name}</strong></span>
          </div>
          <span className="text-[11px] text-slate-400">({currentUser.title})</span>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">نام کاربری / شناسه پرسنلی</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2B2B2B] border border-slate-700 rounded-xl focus:border-[#F9C319] text-white outline-hidden dir-ltr text-left font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2B2B2B] border border-slate-700 rounded-xl focus:border-[#F9C319] text-white outline-hidden dir-ltr text-left font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F9C319] hover:bg-amber-400 text-[#1F1F1F] font-black text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>ورود تاییدشده به پورتال</span>
          </button>
        </form>
      </div>
    </div>
  );
};
