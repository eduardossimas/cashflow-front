import { useState } from 'react';

const fluxoDeCaixa = [
    { dia: 1, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 2, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 3, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 4, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 5, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 6, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 7, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 8, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
    { dia: 9, entradas: '0,00', saidas: '0,00', saldoDia: '0,00', saldoMes: '4.461,53' },
  // Continue os dados para cada dia
];

export function FluxoDeCaixaDiario() {
  const [mesAno, setMesAno] = useState('09/2024');
  const [banco, setBanco] = useState('');

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-full">
      <h1 className="text-2xl font-bold mb-4">Fluxo de Caixa Diário</h1>
      
      <div className="mb-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Mês/Ano</label>
            <input
              type="text"
              value={mesAno}
              onChange={(e) => setMesAno(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Banco</label>
            <select
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Selecione</option>
              <option value="Banco A">Banco A</option>
              <option value="Banco B">Banco B</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Realizado</h2>
        <span className="text-lg font-bold">Saldo Final do Mês Anterior: R$ 4.461,53</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Dia</th>
              <th className="py-2 px-3 text-right">Entradas</th>
              <th className="py-2 px-3 text-right">Saídas</th>
              <th className="py-2 px-3 text-right">Saldo do Dia</th>
              <th className="py-2 px-3 text-right">Saldo do Mês</th>
            </tr>
          </thead>
          <tbody>
            {fluxoDeCaixa.map((item) => (
              <tr key={item.dia} className={item.dia % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-3">{item.dia}</td>
                <td className="py-2 px-3 text-right text-green-600">{item.entradas}</td>
                <td className="py-2 px-3 text-right text-red-500">{item.saidas}</td>
                <td className="py-2 px-3 text-right">{item.saldoDia}</td>
                <td className="py-2 px-3 text-right">{item.saldoMes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
