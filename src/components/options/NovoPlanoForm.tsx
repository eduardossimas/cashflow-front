import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NovoPlanoForm() {

    const [categoria, setCategoria] = useState('');
    const [faixa, setFaixa] = useState('Receitas'); // Valor inicial da faixa
    const navigate = useNavigate(); 

    const savePlanoDeContas = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:3000/planoDeContas');
            const planoDeContas = response.data;
            const maiorId = planoDeContas.length > 0 ? Math.max(...planoDeContas.map((planoDeContas: any) => planoDeContas.id)) : 0;

            const novoPlanoDeContas = {
                id: String(maiorId + 1),
                nome: categoria,
                categoria: categoria,
                faixa: faixa
            };

            await axios.post('http://localhost:3000/planoDeContas', novoPlanoDeContas);
            navigate('/settings');
        } catch (error) {
            console.error('Erro ao salvar o plano de contas:', error);
        }
    };

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={savePlanoDeContas}>
                <label className="text-sm" htmlFor="categoria">Categoria</label>
                <input
                    className="border border-gray-300 rounded-lg p-2"
                    type="text"
                    name="categoria"
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />

                <label className="text-sm" htmlFor="faixa">Faixa DRE</label>
                <select
                    className="border border-gray-300 rounded-lg p-2"
                    name="faixa"
                    id="faixa"
                    value={faixa}
                    onChange={(e) => setFaixa(e.target.value)}
                    required
                >
                    <option value="Receitas">Receitas</option>
                    <option value="Deducoes">Deduções</option>
                    <option value="CustosVariaveis">Custos Variáveis</option>
                    <option value="CustosVariaveis">Custos Fixos</option>
                    <option value="ReceitasFinanceiras">Receitas Financeiras</option>
                    <option value="DespesasFinanceiras">Despesas Financeiras</option>
                </select>

                <button className="bg-orange-500 text-white rounded-lg p-2 hover:bg-orange-600" type="submit">
                    Adicionar
                </button>
            </form>
        </div>
    );
}
