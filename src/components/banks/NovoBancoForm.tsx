import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export function NovoBancoForm() {

    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [saldo, setSaldo] = useState(0);

    const navigate = useNavigate()

    const returnBanco = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/banks');
    };

    const saveBanco = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await axios.get('http://localhost:3000/bancos');
            const bancos = response.data;
            const maiorId = bancos.length > 0 ? Math.max(...bancos.map((banco: any) => banco.id)) : 0;

            const novoBanco = {
                id: String(maiorId + 1),
                nome: nome,
                dataInicio: dataInicio,
                saldo: saldo !== undefined ? saldo : 0,
                transacoes: []
            }

            await axios.post('http://localhost:3000/bancos', novoBanco);
            navigate('/banks');
        } catch (error) {
            console.error('Erro ao salvar o banco:', error);
        }
    };


    return (
        <div className="p-4 bg-white rounded-lg shadow-lg w-full lg:w-full">
            <form onSubmit={saveBanco}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="nome">Nome do Banco</label>
                        <input
                            type="text"
                            id='nome'
                            className="w-full border p-2 rounded-lg mb-4"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="dataInicio">Data de Início</label>
                            <input type="date"
                                id="dataInicio"
                                className="w-full border p-2 rounded-lg mb-4"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Saldo Inicial</label>
                            <input
                                type="number"
                                id="saldo"
                                className="w-full border p-2 rounded-lg mb-4"
                                value={saldo}
                                onChange={(e) => setSaldo(Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="lg:flex lg:flex-row gap-4">
                        <button type='submit' className="bg-green-500 text-white p-2 rounded-lg w-1/6">Salvar</button>
                        <button onClick={returnBanco} className="bg-red-500 text-white p-2 rounded-lg w-1/6">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}