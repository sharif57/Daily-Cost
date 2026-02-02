'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Globe, Settings } from 'lucide-react'
import Earth from '../icon/earth'
import Dollar from '../icon/dollar'

type ConfigState = {
    baseReporting: string
    exchangeRateProvider: string
    supportedCurrencies: string[]
    decimalPrecision: number
    autoRounding: boolean
    timezone: string
    language: string
    dateFormat: string
    calendar: 'gregorian' | 'hijri'
    environment: string
    version: string
    lastDeployed: string
}

export default function ConfigPage() {
    const [currencyCode, setCurrencyCode] = useState('')
    const [config, setConfig] = useState<ConfigState>({
        baseReporting: 'SAR',
        exchangeRateProvider: 'Open Exchange Rates',
        supportedCurrencies: ['SAR', 'USD', 'AED'],
        decimalPrecision: 3,
        autoRounding: true,
        timezone: 'GMT+03:00',
        language: 'English (UK)',
        dateFormat: 'DD/MM/YYYY',
        calendar: 'gregorian',
        environment: 'Production',
        version: 'v2.4.1 (Build 890)',
        lastDeployed: 'Oct 24, 2023 14:30 GMT',
    })

    const handleAddCurrency = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currencyCode.trim()) {
            const code = currencyCode.toUpperCase().trim()
            if (!config.supportedCurrencies.includes(code)) {
                setConfig({
                    ...config,
                    supportedCurrencies: [...config.supportedCurrencies, code],
                })
            }
            setCurrencyCode('')
        }
    }

    const handleRemoveCurrency = (code: string) => {
        setConfig({
            ...config,
            supportedCurrencies: config.supportedCurrencies.filter((c) => c !== code),
        })
    }

    const handlePrecisionChange = (delta: number) => {
        const newValue = Math.max(0, config.decimalPrecision + delta)
        setConfig({ ...config, decimalPrecision: newValue })
    }

    const handleSave = () => {
        console.log('Saving configuration:', config)
        alert('Configuration saved successfully!')
    }

    const handleDiscard = () => {
        setConfig({
            baseReporting: 'SAR',
            exchangeRateProvider: 'Open Exchange Rates',
            supportedCurrencies: ['SAR', 'USD', 'AED'],
            decimalPrecision: 3,
            autoRounding: true,
            timezone: 'GMT+03:00',
            language: 'English (UK)',
            dateFormat: 'DD/MM/YYYY',
            calendar: 'gregorian',
            environment: 'Production',
            version: 'v2.4.1 (Build 890)',
            lastDeployed: 'Oct 24, 2023 14:30 GMT',
        })
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className=" space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C]">Currency & App Configuration</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Manage global currency standards, localization preferences, and monitor system environment status. <br className="hidden sm:block" />
                        Changes made here affect all users globally.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Financial Standards Card */}
                        <Card className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Dollar />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-[#0B1220]">Financial Standards</h2>
                                </div>
                                <span className="text-xs text-[#0D0C0C] font-medium">Global</span>
                            </div>

                            <div className="space-y-4">
                                {/* Base Reporting Royal */}
                                <div>
                                    <Label htmlFor="reporting" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        Base Reporting Royal
                                    </Label>
                                    <Select value={config.baseReporting} onValueChange={(v) => setConfig({ ...config, baseReporting: v })}>
                                        <SelectTrigger id="reporting" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                                            <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-[#0D0C0C] mt-2">Used for consolidated financial reporting.</p>
                                </div>

                                {/* Exchange Rate Provider */}
                                <div>
                                    <Label htmlFor="exchange" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        Exchange Rate Provider
                                    </Label>
                                    <Select value={config.exchangeRateProvider} onValueChange={(v) => setConfig({ ...config, exchangeRateProvider: v })}>
                                        <SelectTrigger id="exchange" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Open Exchange Rates">Open Exchange Rates</SelectItem>
                                            <SelectItem value="ECB">European Central Bank</SelectItem>
                                            <SelectItem value="SAMA">Saudi Monetary Authority</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Supported Currencies */}
                                <div>
                                    <Label htmlFor="currency" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        Supported Currencies
                                    </Label>
                                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg min-h-[40px]">
                                        {config.supportedCurrencies.map((code) => (
                                            <div key={code} className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-[#0B1220]">
                                                {code}
                                                <button
                                                    onClick={() => handleRemoveCurrency(code)}
                                                    className="text-[#0D0C0C] hover:text-gray-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            id="currency"
                                            type="text"
                                            value={currencyCode}
                                            onChange={(e) => setCurrencyCode(e.target.value)}
                                            onKeyPress={handleAddCurrency}
                                            placeholder="Type code to add..."
                                            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Decimal Precision */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-[#0B1220] mb-2 block">Decimal Precision</Label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePrecisionChange(-1)}
                                                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-lg font-semibold"
                                            >
                                                −
                                            </button>
                                            <div className="w-12 h-8 flex items-center justify-center rounded-full bg-[#090A58] text-white font-semibold text-sm">
                                                {config.decimalPrecision}
                                            </div>
                                            <button
                                                onClick={() => handlePrecisionChange(1)}
                                                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-lg font-semibold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Apply Auto-Rounding */}
                                    <div>
                                        <Label className="text-sm font-medium text-[#0B1220] mb-2 block">Apply Auto-Rounding</Label>
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                checked={config.autoRounding}
                                                onCheckedChange={(v) => setConfig({ ...config, autoRounding: v })}
                                            />
                                        </div>
                                        <p className="text-xs text-[#0D0C0C] mt-2">Round to nearest significant digit.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Regional Preferences Card */}
                        <Card className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Earth />
                                <h2 className="text-lg font-lg text-[#0B1220]">Regional Preferences</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Default Time Zone */}
                                <div>
                                    <Label htmlFor="timezone" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        Default Time Zone
                                    </Label>
                                    <Select value={config.timezone} onValueChange={(v) => setConfig({ ...config, timezone: v })}>
                                        <SelectTrigger id="timezone" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GMT+03:00">(GMT+03:00) Riyadh</SelectItem>
                                            <SelectItem value="GMT+00:00">(GMT+00:00) London</SelectItem>
                                            <SelectItem value="GMT+01:00">(GMT+01:00) Dubai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* System Language */}
                                <div>
                                    <Label htmlFor="language" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        System Language
                                    </Label>
                                    <Select value={config.language} onValueChange={(v) => setConfig({ ...config, language: v })}>
                                        <SelectTrigger id="language" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English (UK)">English (UK)</SelectItem>
                                            <SelectItem value="English (US)">English (US)</SelectItem>
                                            <SelectItem value="Arabic">Arabic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Date Format */}
                                <div>
                                    <Label htmlFor="dateformat" className="text-sm font-medium text-[#0B1220] mb-2 block">
                                        Date Format
                                    </Label>
                                    <Select value={config.dateFormat} onValueChange={(v) => setConfig({ ...config, dateFormat: v })}>
                                        <SelectTrigger id="dateformat" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (31/01/2024)</SelectItem>
                                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (01/31/2024)</SelectItem>
                                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2024-01-31)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Primary Calendar */}
                                <div>
                                    <Label className="text-sm font-medium text-[#0B1220] mb-3 block">Primary Calendar</Label>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setConfig({ ...config, calendar: 'gregorian' })}
                                            className={`px-4 py-2 rounded-full font-medium text-sm transition ${config.calendar === 'gregorian'
                                                ? 'border-2 border-[#E1C67B] bg-[#FFF9E6] text-[#0B1220]'
                                                : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            Gregorian
                                        </button>
                                        <button
                                            onClick={() => setConfig({ ...config, calendar: 'hijri' })}
                                            className={`px-4 py-2 rounded-full font-medium text-sm transition ${config.calendar === 'hijri'
                                                ? 'border-2 border-[#E1C67B] bg-[#FFF9E6] text-[#0B1220]'
                                                : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            Hijri
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* System Environment Card */}
                        <Card className="p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Earth />
                                <h2 className="text-lg font-semibold text-[#0B1220]">System Environment</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Environment */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-600 block">Environment</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium text-green-600">{config.environment}</span>
                                    </div>
                                </div>

                                {/* Version */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-600 block">Version</Label>
                                    <p className="text-sm text-[#0B1220] font-medium mt-2">{config.version}</p>
                                </div>

                                {/* Last Deployed */}
                                <div>
                                    <Label className="text-sm font-medium text-gray-600 block">Last Deployed</Label>
                                    <p className="text-sm text-[#0B1220] font-medium mt-2">{config.lastDeployed}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-[#0D0C0C]">Last updated by Ahmed Al-Sayed 2 hour ago</p>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-gray-400 text-[#0B1220] hover:bg-gray-50"
                            onClick={handleDiscard}
                        >
                            Discard Changes
                        </Button>
                        <Button className="rounded-full bg-[#090A58] hover:bg-[#070847] text-white" onClick={handleSave}>
                            Save Configuration
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
