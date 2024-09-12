import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function ListaPlanoDeContas() {
    const [planosDeContas, setPlanosDeContas] = useState<any[]>([]);

    // Função para buscar os planos de contas da API
    useEffect(() => {
        const fetchPlanosDeContas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/planoDeContas');
                setPlanosDeContas(response.data); // Armazenar os dados no estado
            } catch (error) {
                console.error('Erro ao buscar planos de contas:', error);
            }
        };

        fetchPlanosDeContas();
    }, []);

    // Função para excluir um plano de contas
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/planoDeContas/${id}`);
            // Atualizar a lista removendo o item excluído
            setPlanosDeContas(planosDeContas.filter(plano => plano.id !== id));
        } catch (error) {
            console.error('Erro ao excluir plano de contas:', error);
        }
    };

    return (
        <div>
            <table className="bg-white w-full">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="py-3 px-6 text-left">Descrição</th>
                        <th className="py-3 px-6 text-left">Categoria</th>
                        <th className="py-3 px-6 text-left">Faixa no DRE</th>
                        <th className="py-3 px-6 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {planosDeContas.length > 0 ? (
                        planosDeContas.map((plano: any) => (
                            <tr key={plano.id} className="border-b">
                                <td className="py-3 px-6">{plano.nome}</td>
                                <td className="py-3 px-6">{plano.categoria}</td>
                                <td className="py-3 px-6">{plano.faixa}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(plano.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="py-3 px-6 text-center" colSpan={4}>Nenhum plano de contas cadastrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
