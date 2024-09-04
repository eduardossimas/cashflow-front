export function ResumoTransacao() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    const firstDay = `1 ${month}, ${year}`;
    const lastDay = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const lastDayFormatted = `${lastDay} ${month}, ${year}`;

    return (
        <div className="flex gap-4">
            <div className="p-6 rounded-lg bg-white shadow-xl w-auto">
                <div className="flex flex-col mb-6">
                    <h5>Entradas</h5>
                    <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
                </div>
                <strong className="text-xl lg:text-base">R$6.300,00</strong>
            </div>

            <div className="p-6 rounded-lg bg-white shadow-xl w-auto">
                <div className="flex flex-col mb-6">
                    <h5>Saídas</h5>
                    <span className="text-gray-600 text-[0.65rem]">{firstDay} - {lastDayFormatted}</span>
                </div>
                <strong className="text-xl lg:text-base">R$6.300,00</strong>
            </div>
        </div>
    )
}