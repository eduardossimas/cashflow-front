import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export function FiltrosTransacaoBanco() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedTransactionType, setSelectedTransactionType] = useState('');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value);
    const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDateRange(e.target.value);
    const handleTransactionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTransactionType(e.target.value);

    const handleFilterReset = () => {
        setSelectedCategory('');
        setSelectedDateRange('');
        setSelectedTransactionType('');
    };

    const handleFilter = () => {
        // Lógica para filtrar as transações
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col lg:flex-row lg:space-x-4 mb-4">
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border rounded-lg lg:w-min mb-2 lg:mb-0"
            >
                <option value="">Todas as Categorias</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="transferencia">Transferência</option>
            </select>

            <select
                value={selectedDateRange}
                onChange={handleDateRangeChange}
                className="p-2 border rounded-lg lg:w-min mb-2 lg:mb-0"
            >
                <option value="">Período</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
            </select>

            <select
                value={selectedTransactionType}
                onChange={handleTransactionTypeChange}
                className="p-2 border rounded-lg lg:w-min mb-2 lg:mb-0"
            >
                <option value="">Todos os Tipos</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="transferencia">Transferência</option>
            </select>

            <button
                onClick={handleFilter}
                className="bg-orange-500 text-white p-2 rounded-lg lg:w-auto mb-2 lg:mb-0"
            >
                <FontAwesomeIcon icon={faSearch} className="mr-2 lg:mr-0" />
            </button>

            <button
                onClick={handleFilterReset}
                className="bg-orange-500 text-white p-2 rounded-lg lg:w-auto mb-2 lg:mb-0"
            >
                <FontAwesomeIcon icon={faTrash} className="mr-2 lg:mr-0" />
            </button>
        </div>
    );
}
