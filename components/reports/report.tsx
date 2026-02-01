'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar, Users, BarChart3, TrendingUp, FileText, Grid3x3 } from 'lucide-react';

interface FormData {
    reportType: string;
    dateRange: string;
    businessEntity: string;
    includeArchived: boolean;
    notifyEmail: boolean;
    outputFormat: string;
    saveTemplate: boolean;
}

const reportTypes = [
    {
        id: 'user-wise',
        title: 'User-wise Report',
        description: 'Detailed transaction history breakdown per individual user account.',
        icon: Users,
    },
    {
        id: 'monthly-financial',
        title: 'Monthly Financial',
        description: 'High-level P&L overview and monthly balance sheet summary.',
        icon: Calendar,
    },
    {
        id: 'expense-category',
        title: 'Expense Category',
        description: 'Visual breakdowns of operational expenses by category tags.',
        icon: Grid3x3,
    },
    {
        id: 'growth-performance',
        title: 'Growth & Performance',
        description: 'ROI analysis and portfolio growth metrics against benchmarks.',
        icon: TrendingUp,
    },
];

const outputFormats = [
    {
        id: 'pdf',
        title: 'PDF Document',
        description: 'Best for printing & sharing',
        icon: FileText,
    },
    {
        id: 'csv',
        title: 'CSV / Excel',
        description: 'Best for external analysis',
        icon: BarChart3,
    },
];


export default function Report() {
    const [formData, setFormData] = useState<FormData>({
        reportType: 'monthly-financial',
        dateRange: '',
        businessEntity: 'global-holdings',
        includeArchived: false,
        notifyEmail: true,
        outputFormat: 'pdf',
        saveTemplate: false,
    });

    const handleReportTypeChange = (type: string) => {
        setFormData({ ...formData, reportType: type });
    };

    const handleOutputFormatChange = (format: string) => {
        setFormData({ ...formData, outputFormat: format });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert(`Report generated successfully!\nType: ${formData.reportType}\nFormat: ${formData.outputFormat}`);
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Report Type */}
                <Card className="p-4 sm:p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center justify-center bg-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 text-sm font-semibold text-gray-900">
                            1
                        </span>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Select Report Type
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {reportTypes.map((type) => {
                            const IconComponent = type.icon;
                            const isSelected = formData.reportType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleReportTypeChange(type.id)}
                                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                        ? 'border-[#8491FF] bg-[#F0F1FF]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 z-10">
                                            <div className="bg-[#8491FF] rounded-full p-1 w-6 h-6 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[#E0E3FF]' : 'bg-gray-100'}`}>
                                            <IconComponent
                                                className={`w-5 h-5 ${isSelected ? 'text-[#8491FF]' : 'text-gray-600'}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                                                {type.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                {type.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Step 2: Configuration & Scope */}
                <Card className="p-4 sm:p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center justify-center bg-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 text-sm font-semibold text-gray-900">
                            2
                        </span>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Configuration & Scope
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                        {/* Date Range */}
                        <div>
                            <Label htmlFor="dateRange" className="block mb-2 text-sm font-semibold text-gray-900">
                                Date Range
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8491FF]" size={18} />
                                <input
                                    id="dateRange"
                                    type="text"
                                    placeholder="Select dates"
                                    value={formData.dateRange}
                                    onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8491FF] focus:border-transparent bg-[#F9FAFB]"
                                />
                            </div>
                        </div>

                        {/* Business Entity */}
                        <div>
                            <Label htmlFor="entity" className="block mb-2 text-sm font-semibold text-gray-900">
                                Business Entity
                            </Label>
                            <Select value={formData.businessEntity} onValueChange={(value) => setFormData({ ...formData, businessEntity: value })}>
                                <SelectTrigger id="entity" className="w-full bg-[#F9FAFB] border-gray-300 text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="global-holdings">Global Holdings Ltd.</SelectItem>
                                    <SelectItem value="tech-solutions">Tech Solutions Inc.</SelectItem>
                                    <SelectItem value="finance-corp">Finance Corp</SelectItem>
                                    <SelectItem value="retail-group">Retail Group</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Include Archived Accounts */}
                        <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                            <Label htmlFor="archived" className="text-sm font-medium text-gray-900 cursor-pointer">
                                Include Archived Accounts
                            </Label>
                            <Switch
                                id="archived"
                                checked={formData.includeArchived}
                                onCheckedChange={(checked) => setFormData({ ...formData, includeArchived: checked })}
                            />
                        </div>

                        {/* Notify Email */}
                        <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                            <Label htmlFor="notify" className="text-sm font-medium text-gray-900 cursor-pointer">
                                Notify via Email upon Completion
                            </Label>
                            <Switch
                                id="notify"
                                checked={formData.notifyEmail}
                                onCheckedChange={(checked) => setFormData({ ...formData, notifyEmail: checked })}
                            />
                        </div>
                    </div>
                </Card>

                {/* Step 3: Output Format */}
                <Card className="p-4 sm:p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center justify-center bg-gray-200 rounded-full w-7 h-7 sm:w-8 sm:h-8 text-sm font-semibold text-gray-900">
                            3
                        </span>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Output Format
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        {outputFormats.map((format) => {
                            const IconComponent = format.icon;
                            const isSelected = formData.outputFormat === format.id;
                            return (
                                <button
                                    key={format.id}
                                    type="button"
                                    onClick={() => handleOutputFormatChange(format.id)}
                                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                        ? 'border-[#8491FF] bg-[#F0F1FF]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 z-10">
                                            <div className="bg-[#8491FF] rounded-full p-1 w-6 h-6 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[#E0E3FF]' : 'bg-gray-100'}`}>
                                            <IconComponent
                                                className={`w-5 h-5 ${isSelected ? 'text-[#8491FF]' : 'text-gray-600'}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                                                {format.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                {format.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Save as Template */}
                    <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg">
                        <Checkbox
                            id="template"
                            checked={formData.saveTemplate}
                            onCheckedChange={(checked) => setFormData({ ...formData, saveTemplate: !!checked })}
                            className="border-gray-400"
                        />
                        <Label htmlFor="template" className="text-sm font-medium text-gray-900 cursor-pointer">
                            Save as Template
                        </Label>
                    </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center pt-2">
                    <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2.5 border-2 border-gray-300 rounded-full font-medium text-sm text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        type="submit"
                        className="w-full sm:w-auto bg-[#090A58] hover:bg-[#070847] text-white px-8 py-2.5 rounded-full font-medium text-sm shadow-md hover:shadow-lg transition-all"
                    >
                        Generate Report
                    </Button>
                </div>
            </form>
        </div>
    )
}
