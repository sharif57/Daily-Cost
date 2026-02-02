'use client';

import { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';

interface Admin {
    id: string;
    name: string;
    email: string;
    role: string;
    lastActivity: string;
    status: 'Active' | 'Inactive';
}

interface SuperAdminTableProps {
    data: Admin[];
    onAddNew: () => void;
}

export default function SuperAdminTable({ data, onAddNew }: SuperAdminTableProps) {
    const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
    const [admins, setAdmins] = useState<Admin[]>(data);

    const toggleAll = () => {
        if (selectedAdmins.length === admins.length) {
            setSelectedAdmins([]);
        } else {
            setSelectedAdmins(admins.map((a) => a.id));
        }
    };

    const toggleAdmin = (id: string) => {
        if (selectedAdmins.includes(id)) {
            setSelectedAdmins(selectedAdmins.filter((a) => a !== id));
        } else {
            setSelectedAdmins([...selectedAdmins, id]);
        }
    };

    const handleDelete = (id: string) => {
        setAdmins(admins.filter((a) => a.id !== id));
        setSelectedAdmins(selectedAdmins.filter((a) => a !== id));
    };

    return (
        <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-[#090A58]">Super Admin User Table</h2>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-3 sm:px-4 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedAdmins.length === admins.length && admins.length > 0}
                                    onChange={toggleAll}
                                    className="w-4 h-4 cursor-pointer accent-[#8491FF] rounded"
                                />
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Name
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Email Address
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Administrator Role
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Last Activity
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Security Status
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr
                                key={admin.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors last:border-0"
                            >
                                <td className="px-3 sm:px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedAdmins.includes(admin.id)}
                                        onChange={() => toggleAdmin(admin.id)}
                                        className="w-4 h-4 cursor-pointer accent-[#8491FF] rounded"
                                    />
                                </td>
                                <td className="px-3 sm:px-4 py-4 text-gray-900 font-medium text-sm whitespace-nowrap">
                                    {admin.name}
                                </td>
                                <td className="px-3 sm:px-4 py-4 text-gray-600 text-sm">{admin.email}</td>
                                <td className="px-3 sm:px-4 py-4 text-sm">
                                    <span className="bg-yellow-100 text-yellow-800 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-4 py-4 text-gray-600 text-sm whitespace-nowrap">
                                    {admin.lastActivity}
                                </td>
                                <td className="px-3 sm:px-4 py-4 text-sm">
                                    <span
                                        className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${admin.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current"></span>
                                        {admin.status}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-4 py-4 text-sm space-x-1 sm:space-x-2 flex items-center">
                                    <button className="p-1.5 sm:p-2 hover:bg-blue-50 rounded text-blue-600 transition-colors">
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(admin.id)}
                                        className="p-1.5 sm:p-2 hover:bg-red-50 rounded text-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {admins.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm">No admin users found</p>
                </div>
            )}
        </div>
    );
}
