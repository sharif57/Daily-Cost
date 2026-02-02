'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function PlatformPage() {
    const [sessionTimeout, setSessionTimeout] = useState('15')
    const [passwordComplexity, setPasswordComplexity] = useState('High (Special chars, numbers, caps)')
    const [ipWhitelist, setIpWhitelist] = useState('')
    const [criticalAlerts, setCriticalAlerts] = useState(true)
    const [newUserAlerts, setNewUserAlerts] = useState(true)
    const [weeklySummary, setWeeklySummary] = useState(false)

    const handleSave = () => {
        const payload = {
            sessionTimeout,
            passwordComplexity,
            ipWhitelist,
            notifications: {
                criticalAlerts,
                newUserAlerts,
                weeklySummary,
            },
        }
        console.log('Saving platform settings:', payload)
        alert('Settings saved successfully!')
    }

    const handleDiscard = () => {
        setSessionTimeout('15')
        setPasswordComplexity('High (Special chars, numbers, caps)')
        setIpWhitelist('')
        setCriticalAlerts(true)
        setNewUserAlerts(true)
        setWeeklySummary(false)
    }

    const handleFlushCache = () => {
        alert('System cache flushed.')
    }

    const handleForceLogout = () => {
        alert('All users have been logged out.')
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C]">Platform Settings</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Manage global configurations, security protocols, governance controls, and system preferences for the Bespoke Capital environment.
                    </p>
                </div>
                <Button className="rounded-full bg-[#090A58] hover:bg-[#070847]">View Change Log</Button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                {/* Left Column */}
                <Card className="p-4 sm:p-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="timeout" className="text-sm font-medium">Session Timeout (Minutes)</Label>
                            <Input
                                id="timeout"
                                value={sessionTimeout}
                                onChange={(e) => setSessionTimeout(e.target.value)}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="complexity" className="text-sm font-medium">Password Complexity</Label>
                            <Input
                                id="complexity"
                                value={passwordComplexity}
                                onChange={(e) => setPasswordComplexity(e.target.value)}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="ip" className="text-sm font-medium">IP Whitelisting</Label>
                        <textarea
                            id="ip"
                            value={ipWhitelist}
                            onChange={(e) => setIpWhitelist(e.target.value)}
                            placeholder="Enter IP addresses separated by commas..."
                            className="mt-2 w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                        <p className="text-xs text-muted-foreground mt-2">Leave empty to allow access from any IP.</p>
                    </div>
                </Card>

                {/* Right Column */}
                <div className="space-y-6">
                    <Card className="p-4 sm:p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Alerts</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between border rounded-full px-4 py-2">
                                <span className="text-sm text-gray-900">Critical System Alerts</span>
                                <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                            </div>
                            <div className="flex items-center justify-between border rounded-full px-4 py-2">
                                <span className="text-sm text-gray-900">New User Registrations</span>
                                <Switch checked={newUserAlerts} onCheckedChange={setNewUserAlerts} />
                            </div>
                            <div className="flex items-center justify-between border rounded-full px-4 py-2">
                                <span className="text-sm text-gray-900">Weekly Summary Report</span>
                                <Switch checked={weeklySummary} onCheckedChange={setWeeklySummary} />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 sm:p-6 border border-red-200 bg-red-50/30">
                        <div className="flex items-center gap-2 text-[#E64462] font-medium  text-lg mb-2">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Danger Zone
                        </div>
                        <p className="text-xs text-red-500 mb-4">Irreversible actions. Please proceed with caution.</p>
                        <div className="space-y-3">
                            <button
                                onClick={handleFlushCache}
                                className="w-full flex items-center justify-between rounded-full border border-red-400 text-[#E64462] px-4 py-2 text-sm hover:bg-red-50 transition"
                            >
                                Flush System Cache
                                <span>⟳</span>
                            </button>
                            <button
                                onClick={handleForceLogout}
                                className="w-full flex items-center justify-between rounded-full border border-red-400 text-[#E64462] px-4 py-2 text-sm hover:bg-red-50 transition"
                            >
                                Force Logout All Users
                                <span>↳</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row bg-white sm:items-center sm:justify-between gap-4 py-4 px-6 border-t">
                <p className="text-xs text-muted-foreground">* Unsaved change will be lost</p>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full" onClick={handleDiscard}>
                        Discard
                    </Button>
                    <Button className="rounded-full bg-[#090A58] hover:bg-[#070847]" onClick={handleSave}>
                        Save Change
                    </Button>
                </div>
            </div>
        </div>
    )
}
