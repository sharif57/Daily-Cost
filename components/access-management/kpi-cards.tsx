'use client';

interface KPICard {
    label: string;
    value: string;
    change: string;
    changeColor: 'green' | 'red';
}

interface KPICardsProps {
    cards: KPICard[];
}

export default function KPICards({ cards }: KPICardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 lg:p-6 hover:shadow-sm transition-shadow"
                >
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2 tracking-wide">
                        {card.label}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#090A58] mb-2">
                        {card.value}
                    </h3>
                    <p
                        className={`text-xs font-medium ${card.changeColor === 'green' ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {card.change}
                    </p>
                </div>
            ))}
        </div>
    );
}
