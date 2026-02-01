'use client';

import Report from "./report";


export default function GenerateReportForm() {
    

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C] mb-2">
                    Generate Report
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Configure parameters to generate detailed financial statements and audit logs for your portfolios.
                </p>
            </div>
            <Report />
            
        </div>
    );
}
