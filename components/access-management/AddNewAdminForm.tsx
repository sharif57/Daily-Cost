'use client';

import { useState } from 'react';
import { Lock, ShieldAlert, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddNewAdminForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [autoGenerate, setAutoGenerate] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        adminRole: 'Secondary Super Admin',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const generatePassword = () => {
        const length = 16;
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setFormData((prev) => ({
            ...prev,
            password: password,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.fullName && formData.email && formData.password) {
            // Handle form submission
            console.log('Admin created:', formData);
            router.push('/users/access-management');
        }
    };

    const handleCancel = () => {
        router.push('/users/access-management');
    };

    const roles = [
        'Super Admin',
        'Secondary Super Admin',
        'Admin',
        'Moderator',
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#090A58] mb-2">Add New Admin</h1>
                    <p className="text-sm text-gray-600">
                        Grant portal access to a new administrative user. Only Super Admins can perform this action.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <CheckCircle2 size={20} className="text-[#090A58]" />
                                <h2 className="text-lg font-bold text-[#090A58]">Personal Information</h2>
                            </div>

                            <div className="space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-gray-50 placeholder-gray-400"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="e.g. admin@thepeoplescapital.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-gray-50 placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Security & Credentials */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Lock size={20} className="text-[#090A58]" />
                                <h2 className="text-lg font-bold text-[#090A58]">Security & Credentials</h2>
                            </div>

                            <div className="space-y-5">
                                {/* Initial Password */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-semibold text-gray-900">
                                            Initial Password
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={autoGenerate}
                                                onChange={(e) => {
                                                    setAutoGenerate(e.target.checked);
                                                    if (e.target.checked) {
                                                        generatePassword();
                                                    } else {
                                                        handleInputChange('password', '');
                                                    }
                                                }}
                                                className="w-4 h-4 accent-[#8491FF] rounded"
                                            />
                                            <span className="text-xs text-gray-600">Auto-generate secure password</span>
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create new password"
                                            value={formData.password}
                                            onChange={(e) => {
                                                handleInputChange('password', e.target.value);
                                                if (autoGenerate) {
                                                    setAutoGenerate(false);
                                                }
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-gray-50 placeholder-gray-400 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Warning Message */}
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r p-4 flex gap-3">
                                    <ShieldAlert size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-900 mb-1">
                                            Must not contain user name or email
                                        </p>
                                        <p className="text-xs text-yellow-700">
                                            This rule can manage insecure, obvious formulations, and slow exploits. However, they cannot create office admins username or modify system-wide security settings.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Access Control */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <ShieldAlert size={20} className="text-[#090A58]" />
                                <h2 className="text-lg font-bold text-[#090A58]">Access Control</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Admin Role
                                </label>
                                <select
                                    value={formData.adminRole}
                                    onChange={(e) => handleInputChange('adminRole', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-white text-gray-900"
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200 justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-[#090A58] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm"
                            >
                                Create Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
