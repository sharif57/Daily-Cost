'use client';

import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import KPICards from './kpi-cards';
import SuperAdminTable from './super-admin-table';
import SystemAccessLogs from './system-access-logs';
import AddAdminModal from './add-admin-modal';

export default function UnifiedAccessContent() {
    const router = useRouter();
    const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
    const [admins, setAdmins] = useState([
        {
            id: '1',
            name: 'Devon Lane',
            email: 'devon.lane@example.com',
            role: 'Super Admin',
            lastActivity: '2 hours ago',
            status: 'Active' as const,
        },
        {
            id: '2',
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            role: 'Secondary Super Admin',
            lastActivity: '1 hour ago',
            status: 'Active' as const,
        },
        {
            id: '3',
            name: 'Robert Fox',
            email: 'robert.fox@example.com',
            role: 'Secondary Super Admin',
            lastActivity: '1 day ago',
            status: 'Inactive' as const,
        },
    ]);

    const kpiData = [
        {
            label: 'Total Logins',
            value: '1,248',
            change: 'of 1750, so far',
            changeColor: 'green' as const,
        },
        {
            label: 'Logins',
            value: '3',
            change: 'admin logins',
            changeColor: 'red' as const,
        },
        {
            label: 'Data Export',
            value: '12',
            change: 'exported 2 records',
            changeColor: 'green' as const,
        },
        {
            label: 'Admin Sessions',
            value: '85',
            change: 'across 85 logins',
            changeColor: 'green' as const,
        },
    ];

    const logs = [
        {
            id: '1',
            user: 'A Smith',
            userInitial: 'A',
            userColor: 'bg-blue-500',
            timestamp: 'Oct 24, 2023 14:00:15',
            ipAddress: '192.168.1.1',
            location: 'London, UK',
            action: 'User Login',
            status: 'Success' as const,
            details: '—',
        },
        {
            id: '2',
            user: 'A Smith',
            userInitial: 'A',
            userColor: 'bg-blue-500',
            timestamp: 'Oct 24, 2023 14:00:15',
            ipAddress: '192.168.1.1',
            location: 'London, UK',
            action: 'Login Attempt',
            status: 'Success' as const,
            details: '—',
        },
        {
            id: '3',
            user: 'A Smith',
            userInitial: 'A',
            userColor: 'bg-blue-500',
            timestamp: 'Oct 24, 2023 14:00:15',
            ipAddress: '192.168.1.1',
            location: 'London, UK',
            action: 'Link Backup',
            status: 'Flagged' as const,
            details: '—',
        },
        {
            id: '4',
            user: 'A Smith',
            userInitial: 'A',
            userColor: 'bg-blue-500',
            timestamp: 'Oct 24, 2023 14:00:15',
            ipAddress: '192.168.1.1',
            location: 'London, UK',
            action: 'Password Reset',
            status: 'Failed' as const,
            details: '—',
        },
        {
            id: '5',
            user: 'A Smith',
            userInitial: 'A',
            userColor: 'bg-blue-500',
            timestamp: 'Oct 24, 2023 14:00:15',
            ipAddress: '192.168.1.1',
            location: 'London, UK',
            action: 'User Login',
            status: 'Success' as const,
            details: '—',
        },
    ];

    const handleAddAdmin = (newAdmin: any) => {
        const admin = {
            id: Date.now().toString(),
            name: newAdmin.accountInformation,
            email: newAdmin.email,
            role: 'Super Admin',
            lastActivity: 'Just now',
            status: 'Active' as const,
        };
        setAdmins([...admins, admin]);
    };

    const handleExportAll = () => {
        const csv = [
            ['Name', 'Email', 'Role', 'Last Activity', 'Status'],
            ...admins.map((a) => [a.name, a.email, a.role, a.lastActivity, a.status]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'admins_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#090A58] mb-1 sm:mb-2">
                            Unified Access & Logs Management
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage administration privileges and monitor system access events globally
                        </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                        <button
                            onClick={handleExportAll}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm whitespace-nowrap"
                        >
                            <Download size={16} />
                            <span>Export All</span>
                        </button>
                        <button
                            onClick={() => router.push('/security/add-new-user')}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#090A58] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-xs sm:text-sm whitespace-nowrap"
                        >
                            <Plus size={16} />
                            <span>Add New User</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="mb-6 sm:mb-8">
                <KPICards cards={kpiData} />
            </div>

            {/* Super Admin Table */}
            <div className="mb-6 sm:mb-8 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <SuperAdminTable data={admins} onAddNew={() => router.push('/users/access-management/add-new-user')} />
            </div>

            {/* System Access Logs */}
            <div className="mb-6">
                <SystemAccessLogs data={logs} />
            </div>

            {/* Add Admin Modal */}
            <AddAdminModal
                isOpen={isAddAdminOpen}
                onClose={() => setIsAddAdminOpen(false)}
                onAdd={handleAddAdmin}
            />
        </div>
    );
}
