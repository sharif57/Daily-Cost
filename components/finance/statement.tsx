import React from 'react';

const data = [
    {
        section: 'Revenue',
        items: [
            { label: 'Subscription Fees', current: 12450, previous: 12450, ytd: 450, growth: 3.6 },
            { label: 'Advisory Services', current: 12450, previous: 150, ytd: 2450, growth: 3.6 },
            { label: 'Halal Investment Returns', current: 12450, previous: 1250, ytd: 1450, growth: -3.6 },
        ],
        total: { label: 'Total Revenue', current: 12450, previous: 12450, ytd: 12450, growth: 3.6 },
    },
    {
        section: 'Cost of Goods Sold',
        items: [
            { label: 'Data Feed Cost', current: 12450, previous: 12450, ytd: 450, growth: 3.6 },
            { label: 'Server Infrastructure', current: 12450, previous: 150, ytd: 2450, growth: 3.6 },
            { label: 'Payment Processing', current: 12450, previous: 1250, ytd: 1450, growth: -3.6 },
        ],
        total: { label: 'Gross Profit', current: 12450, previous: 12450, ytd: 12450, growth: 3.6 },
    },
    {
        section: 'Operating Expenses',
        items: [
            { label: 'Office Rent', current: 12450, previous: 12450, ytd: 450, growth: 3.6 },
            { label: 'Salaries', current: 12450, previous: 150, ytd: 2450, growth: 3.6 },
            { label: 'Marketing', current: 12450, previous: 1250, ytd: 1450, growth: -3.6 },
        ],
        total: { label: 'Total Operating Expenses', current: 12450, previous: 12450, ytd: 12450, growth: 3.6 },
    },
];

const formatCurrency = (num: number) =>
    num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

const Growth = ({ value }: { value: number }) => (
    <span className={
        value > 0
            ? 'text-green-600 font-medium'
            : value < 0
                ? 'text-red-500 font-medium'
                : 'text-gray-500 font-medium'
    }>
        {value > 0 ? '+' : ''}{value}%
    </span>
);

export default function Statement() {
    return (
        <div className="w-full   rounded-xl ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-medium text-gray-800">Detailed Statement</h2>
                <div>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 text-sm">
                        Monthly
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-10 p-3 text-left">
                                <input type="checkbox" className="accent-primary h-4 w-4" />
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">Description</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Current Month</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Previous Month</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Year to Date</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Growth (YOY)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((section, idx) => (
                            <React.Fragment key={section.section}>
                                {/* Section Header */}
                                <tr className="bg-gray-50">
                                    <td colSpan={6} className={
                                        idx === 0
                                            ? 'text-yellow-700 font-semibold py-2 pl-4 bg-yellow-50 border-t border-b border-yellow-100'
                                            : idx === 1
                                                ? 'text-yellow-700 font-semibold py-2 pl-4 bg-yellow-50 border-t border-b border-yellow-100'
                                                : 'text-yellow-700 font-semibold py-2 pl-4 bg-yellow-50 border-t border-b border-yellow-100'
                                    }>
                                        {section.section}
                                    </td>
                                </tr>
                                {/* Section Items */}
                                {section.items.map((item, i) => (
                                    <tr key={item.label} className="hover:bg-gray-50">
                                        <td className="p-3 text-left">
                                            <input type="checkbox" className="accent-primary h-4 w-4" />
                                        </td>
                                        <td className="p-3 text-gray-700">{item.label}</td>
                                        <td className="p-3 text-right">{formatCurrency(item.current)}</td>
                                        <td className="p-3 text-right">{formatCurrency(item.previous)}</td>
                                        <td className="p-3 text-right">{formatCurrency(item.ytd)}</td>
                                        <td className="p-3 text-right"><Growth value={item.growth} /></td>
                                    </tr>
                                ))}
                                {/* Section Total */}
                                <tr className="bg-gray-100">
                                    <td></td>
                                    <td className="p-3 font-semibold text-gray-800">{section.total.label}</td>
                                    <td className="p-3 text-right font-semibold">{formatCurrency(section.total.current)}</td>
                                    <td className="p-3 text-right font-semibold">{formatCurrency(section.total.previous)}</td>
                                    <td className="p-3 text-right font-semibold">{formatCurrency(section.total.ytd)}</td>
                                    <td className="p-3 text-right font-semibold"><Growth value={section.total.growth} /></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
