'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (admin: any) => void;
}

export default function AddAdminModal({ isOpen, onClose, onAdd }: AddAdminModalProps) {
    const [formData, setFormData] = useState({
        accountInformation: '',
        email: '',
        permissions: {
            readContact: false,
            invite: false,
        },
        sendInvite: false,
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePermissionChange = (permission: string) => {
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permission]: !prev.permissions[permission as keyof typeof prev.permissions],
            },
        }));
    };

    const handleSubmit = () => {
        if (formData.accountInformation && formData.email) {
            onAdd(formData);
            setFormData({
                accountInformation: '',
                email: '',
                permissions: {
                    readContact: false,
                    invite: false,
                },
                sendInvite: false,
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[#090A58]">Add New Admin</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                <div className="space-y-5 sm:space-y-6">
                    {/* Account Information */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Account Information
                        </label>
                        <input
                            type="text"
                            placeholder="Devon Lane"
                            value={formData.accountInformation}
                            onChange={(e) => handleChange('accountInformation', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-gray-50"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="devon@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-gray-50"
                        />
                    </div>

                    {/* Permissions Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            <span className="inline-block">Read & Contact</span>
                        </h3>
                        <div className="space-y-2.5">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.permissions.readContact}
                                    onChange={() => handlePermissionChange('readContact')}
                                    className="w-4 h-4 accent-[#8491FF] rounded mt-0.5 flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700">Read & Contact</span>
                            </label>
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.permissions.invite}
                                    onChange={() => handlePermissionChange('invite')}
                                    className="w-4 h-4 accent-[#8491FF] rounded mt-0.5 flex-shrink-0"
                                />
                                <span className="text-sm text-gray-700">Invite</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">2 out of 8 permissions</p>
                    </div>

                    {/* Send Invite */}
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg p-3 sm:p-4">
                        <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.sendInvite}
                                onChange={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        sendInvite: !prev.sendInvite,
                                    }))
                                }
                                className="w-4 h-4 accent-[#8491FF] rounded mt-0.5 flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Send Invitation</p>
                                <p className="text-xs text-gray-600 mt-1">Send an invitation to this email</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2.5 bg-[#090A58] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm"
                    >
                        Add Admin
                    </button>
                </div>
            </div>
        </div>
    );
}
